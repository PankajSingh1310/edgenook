import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../context/user.context";

const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserData, isLoggedIn } = useContext(userContext);
  const [isChecking, setIsChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token  = localStorage.getItem("Admintoken");
      console.log("Admin token:", token);
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const user = response.data.user;
          setUserData(user);
          setIsLoggedIn(true);
          setIsAdmin(user.role === "admin");
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.error("Admin auth failed:", error.message);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/login");
      } finally {
        setIsChecking(false);
      }
    };

    verifyAdmin();
  }, [navigate, setIsLoggedIn, setUserData]);

  if (isChecking) {
    return <div className="text-center p-10">Checking admin access...</div>;
  }

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
