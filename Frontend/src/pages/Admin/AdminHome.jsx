import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ModeToggle } from '@/components/ui/mode-toggle';
import adminContext from '@/context/admin.context';

const AdminHome = () => {
  const [stats, setStats] = useState({ users: 0, courses: 0, enrollments: 0 });
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUsers, setShowUsers] = useState(true);

  const {adminData,isAdminLoggedIn} = useContext(adminContext);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, coursesRes] = await Promise.all([
        axios.get('/api/admin/users'),
        axios.get('/api/courses'),
      ]);

      setStats({
        users: usersRes.data.length,
        courses: coursesRes.data.length,
        enrollments: 0,
      });

      // setUsers(usersRes.data);
      // setCourses(coursesRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete('/api/user/delete/${id}');
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/course/delete/${id}`);
      setCourses(courses.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAllUsers = async () => {
    if (!window.confirm('Are you sure you want to delete all users?')) return;
    try {
      await axios.delete('/api/admin/users/delete-all');
      setUsers([]);
    } catch (err) {
      console.error('Failed to delete all users:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <p className="p-4">Loading admin data...</p>;

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen text-black dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1>Hello Sir {adminData.name}</h1>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className='flex gap-5'>
        <Link to='/admin/logout' className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"> Logout </Link>
        <ModeToggle />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-4xl font-bold mt-2">{stats.users}</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Total Courses</h2>
          <p className="text-4xl font-bold mt-2">{stats.courses}</p>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Total Enrollments</h2>
          <p className="text-4xl font-bold mt-2">{stats.enrollments}</p>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Courses</h2>
          <Link
            to="/admin/create-course"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Course
          </Link>
        </div>
        <ul className="divide-y divide-gray-300 dark:divide-gray-700">
          {courses.map(course => (
            <li key={course._id} className="flex justify-between py-3 items-center">
              <div>
                <h3 className="text-lg font-medium text-black dark:text-white">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{course.description}</p>
              </div>
              <div className="flex gap-4">
                <Link
                  to={`/admin/edit-course/${course._id}`}
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
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Users</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setShowUsers(!showUsers)}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              {showUsers ? 'Hide Users' : 'See All Users'}
            </button>
            <button
              onClick={handleDeleteAllUsers}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete All Users
            </button>
          </div>
        </div>
        {showUsers && (
          <ul className="divide-y divide-gray-300 dark:divide-gray-700">
            {users.map(user => (
              <li key={user._id} className="flex justify-between py-3 items-center">
                <div>
                  <p className="text-lg font-medium text-black dark:text-white">{user.fullname}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
