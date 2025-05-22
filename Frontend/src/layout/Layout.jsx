// src/layouts/Layout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="px-6 py-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
