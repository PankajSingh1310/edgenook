import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/courses');
        setCourses(res.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {courses.map((course) => (
        <Link
          to={`/courses/${course._id}`}
          key={course._id}
          className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
        >
          {course.avatar && (
            <img
              src={course.avatar}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
              {course.title}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">
              {course.description}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3">
              Duration: {course.duration}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Courses;
