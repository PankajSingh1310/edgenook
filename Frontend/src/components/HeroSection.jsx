import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full h-full dark:text-white py-20 px-6 flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold max-w-4xl">
        Learn from the best courses online
      </h1>
      <p className="mt-4 max-w-2xl text-lg md:text-xl">
        Discover thousands of courses taught by expert instructors and start your journey today.
      </p>
      <button className="mt-8 px-8 py-3 shadow-2xl dark:bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
        <Link to="/courses">Explore Courses</Link>
      </button>
    </section>
  );
};

export default Hero;
