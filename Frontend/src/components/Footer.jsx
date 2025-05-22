import React from "react";

const Footer = () => {
  return (
    <footer className="w-full shadow-2xl dark:text-gray-300 py-6 px-6 text-center">
      <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
