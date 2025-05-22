import React from "react";
import HeroSection from "@/components/HeroSection";
import CourseCarousel from "@/components/CourseCarousel";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <CourseCarousel />
      <Footer />
    </main>
  );
};

export default Home;
