// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CourseCarousel = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     axios.get("/api/courses")  // replace with your backend URL
//       .then(res => setCourses(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <section className="w-full py-10 px-6 bg-gray-50 dark:bg-gray-900">
//       <h2 className="text-2xl font-semibold mb-6">Popular Courses</h2>
//       <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
//         {courses.length === 0 && (
//           <p className="text-gray-500">No courses available.</p>
//         )}
//         {courses.map(course => (
//           <div key={course._id} className="min-w-[250px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex-shrink-0">
//             <img src={course.image} alt={course.title} className="h-40 w-full object-cover rounded-md" />
//             <h3 className="mt-2 font-semibold text-lg">{course.title}</h3>
//             <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{course.description?.slice(0, 60)}...</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CourseCarousel;

import React, { useState } from "react";

const dummyCourses = [
  {
    _id: "1",
    title: "React for Beginners",
    description: "Learn the fundamentals of React and build awesome web apps.",
    image: "https://source.unsplash.com/400x225/?react,code",
  },
  {
    _id: "2",
    title: "Advanced JavaScript",
    description: "Deep dive into modern JavaScript features and best practices.",
    image: "https://source.unsplash.com/400x225/?javascript,code",
  },
  {
    _id: "3",
    title: "Fullstack Web Development",
    description: "Master front-end and back-end development with practical projects.",
    image: "https://source.unsplash.com/400x225/?programming,web",
  },
  {
    _id: "4",
    title: "Python for Data Science",
    description: "Learn Python and data analysis with real-world datasets.",
    image: "https://source.unsplash.com/400x225/?python,data",
  },
  {
    _id: "5",
    title: "UI/UX Design Basics",
    description: "Understand the principles of great user interface and experience design.",
    image: "https://source.unsplash.com/400x225/?design,ui",
  },
];

const CourseCarousel = () => {
  const [courses] = useState(dummyCourses);

  return (
    <section className="w-full py-10 px-6 bg-gray-50 dark:bg-black">
      <h2 className="text-2xl font-semibold mb-6">Popular Courses</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {courses.map(course => (
          <div
            key={course._id}
            className="min-w-[250px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex-shrink-0"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-40 w-full object-cover rounded-md"
            />
            <h3 className="mt-2 font-semibold text-lg">{course.title}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {course.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseCarousel;
