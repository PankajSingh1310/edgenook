// src/pages/SingleCourse.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${id}`);
        setCourse(res.data.course);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = () => {
    navigate(`/enroll/${id}`);
  };

  if (!course) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-zinc-700 dark:text-zinc-300 mb-6">{course.description}</p>

      {course.avatar && (
        <img src={course.avatar} alt={course.title} className="w-full max-h-96 object-cover rounded-xl mb-6" />
      )}

      <h2 className="text-xl font-semibold mb-2">Modules:</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        {course.modules.map((mod, idx) => (
          <li key={idx}>
            <strong>{mod.title}:</strong> {mod.content}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">What Students Get:</h2>
      <p className="mb-2">{course.studentsGet.description}</p>
      <ul className="list-disc list-inside">
        {course.studentsGet.samples.map((sample, idx) => (
          <li key={idx}>{sample}</li>
        ))}
      </ul>

      <button
        onClick={handleEnroll}
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Enroll Now
      </button>
    </div>
  );
};

export default SingleCourse;
