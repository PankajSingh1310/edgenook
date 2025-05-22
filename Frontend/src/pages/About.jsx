import React from "react";

const About = () => {
  return (
    <div className="w-full px-6 py-10 lg:px-20 dark:bg-black dark:text-white text-zinc-800">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Empowering Learners Everywhere</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          Our platform helps students and professionals gain skills that shape their future.
          We believe in accessible education, built for everyone.
        </p>
      </section>

      {/* Mission + Vision */}
      <section className="mt-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-2">🌎 Our Mission</h2>
          <p className="text-zinc-600 dark:text-zinc-300">
            To provide world-class learning opportunities that are affordable, accessible,
            and effective for people across the globe. Whether you're a student, a working professional, 
            or an entrepreneur — we’re here for your growth journey.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">🚀 Our Vision</h2>
          <p className="text-zinc-600 dark:text-zinc-300">
            Build a global community of lifelong learners and instructors — where education is democratized,
            personalized, and powered by technology that cares.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Impact in Numbers</h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-4xl mx-auto">
          <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl shadow">
            <p className="text-2xl font-bold">1M+</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Students Enrolled</p>
          </div>
          <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl shadow">
            <p className="text-2xl font-bold">2K+</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Courses Available</p>
          </div>
          <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl shadow">
            <p className="text-2xl font-bold">500+</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Expert Instructors</p>
          </div>
          <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl shadow">
            <p className="text-2xl font-bold">100+</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Countries Reached</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-2">Join Our Learning Revolution</h2>
        <p className="text-zinc-600 dark:text-zinc-300 mb-6">
          Be part of a community that's changing how the world learns. Start exploring today.
        </p>
        <a
          href="/signup"
          className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium transition hover:scale-105"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

export default About;
