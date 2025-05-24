import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CourseCarousel = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses"); 
        setCourses(res.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="w-full py-10 px-6 bg-gray-50 dark:bg-black">
      <h2 className="text-2xl font-semibold mb-6">Popular Courses</h2>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No courses available.</p>
      ) : (
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {courses.map((course) => (
            <Link
              key={course._id}
              to={`/courses/${course._id}`}
              className="min-w-[250px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex-shrink-0 hover:shadow-2xl transition-shadow"
            >
              <img
                src={course.avatar}
                alt={course.title}
                className="h-40 w-full object-cover rounded-md"
              />
              <h3 className="mt-2 font-semibold text-lg">{course.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {course.description?.slice(0, 80)}...
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default CourseCarousel;
