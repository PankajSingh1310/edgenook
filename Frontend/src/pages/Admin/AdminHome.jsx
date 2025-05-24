import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAdmin } from "@/context/admin.context";
import StatCard from "@/components/StatCard";
import { set } from "react-hook-form";

const AdminHome = () => {
  const [stats, setStats] = useState({ users: 0, courses: 0, enrollments: 0 });
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUsers, setShowUsers] = useState(true);
  const [showCourses, setShowCourses] = useState(true);

  const { adminData, setAdminData, setIsAdminLoggedIn } = useAdmin();

  const fetchDashboardData = async () => {
    try {
      const [usersRes, coursesRes] = await Promise.all([
        axios.get("/api/admin/users"),
        axios.get("/api/courses"),
      ]);

      setStats({
        users: usersRes.data.users.length,
        courses: coursesRes.data.courses.length,
        enrollments: 0,
      });

      setUsers(usersRes.data.users);
      setCourses(coursesRes.data.courses);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogout = async () => {
    try {
      const token = localStorage.getItem("Admintoken");
      await axios.post(
        "/api/admin/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("Admintoken");
      setAdminData(null);
      setIsAdminLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("Admintoken");
      setAdminData(null);
      setIsAdminLoggedIn(false);
      navigate("/");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/admin/user/delete/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`/api/admin/course/delete/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <p className="p-4">Loading admin data...</p>;

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-black min-h-screen text-black dark:text-white space-y-10">
      {/* Top Header */}
      <div className="w-full bg-gray-400 dark:bg-gray-900 text-white px-4 py-3 flex flex-wrap items-center justify-between shadow-md">
        {/* Left: Greeting and Title */}
        <div className="flex items-center gap-4 justify-between flex-wrap w-[50%]">
          {/* Hide admin name on mobile */}
          <span className="text-lg font-semibold hidden sm:inline">
            Hello Sir, {adminData?.name}
          </span>
          <span className="text-md font-bold truncate whitespace-nowrap lg:text-lg self-end">
            Admin Dashboard
          </span>
        </div>

        {/* Right: Logout button and ModeToggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button onClick={handleAdminLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md whitespace-nowrap"
            >
              Logout
          </button>
          <ModeToggle />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total Users" value={stats.users} color="indigo" />
        <StatCard label="Total Courses" value={stats.courses} color="green" />
        <StatCard
          label="Total Enrollments"
          value={stats.enrollments}
          color="yellow"
        />
      </div>

      {/* Courses Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg font-semibold">Courses</h2>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowCourses(!showCourses)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm"
            >
              {showCourses ? "Hide Courses" : "Show Courses"}
            </button>
            <Link
              to="/admin/course"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              + Create Course
            </Link>
          </div>
        </div>

        {showCourses && (
          <ul className="divide-y divide-gray-300 dark:divide-gray-700">
            {courses.map((course) => (
              <li
                key={course._id}
                className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
              >
                <div>
                  <h3 className="text-base font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {course.description}
                  </p>
                </div>
                <div className="flex gap-4 text-sm">
                  <Link
                    to={`/admin/course/edit/${course._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Users Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Users</h2>
          <button
            onClick={() => setShowUsers(!showUsers)}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm"
          >
            {showUsers ? "Hide Users" : "Show Users"}
          </button>
        </div>
        {showUsers && (
          <ul className="divide-y divide-gray-300 dark:divide-gray-700">
            {users.map((user) => (
              <li
                key={user._id}
                className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
              >
                <div>
                  <p className="text-base font-medium">
                    {user.fullname.firstname} {user.fullname.lastname}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminHome;
