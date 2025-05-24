import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import adminContext from "@/context/admin.context";
import { set } from "react-hook-form";

const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const { setAdminData, setIsAdminLoggedIn, setAdminError , isAdminLoggedIn} =useContext(adminContext);
  const [isChecking, setIsChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("Admintoken");
      // console.log("Admin token:", token);
      if (!token) {
        console.log("No token found, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("/api/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const user = response.data.user;
          setAdminData(user);
          setIsAdminLoggedIn(true);
          setIsAdmin(user.role === "admin");
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.error("Admin auth failed:", error.message);
        localStorage.removeItem("token");
        setAdminError(error.message);
        setIsAdmin(false);
        setIsAdminLoggedIn(false);
        setUserData(null);
        navigate("/login");
      } finally {
        setIsChecking(false);
      }
    };

    verifyAdmin();
  }, [navigate, setIsAdminLoggedIn, setAdminData, setAdminError]);

  if (isChecking) {
    return <div className="text-center p-10">Checking admin access...</div>;
  }

  if (!isAdminLoggedIn || !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
