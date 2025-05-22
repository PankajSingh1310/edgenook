import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../context/user.context";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserData } = useContext(userContext);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          'api/user/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setUserData(response.data.user);
          setIsLoggedIn(true);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.error("Authentication failed:", error.message);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/login");
      } finally {
        setIsChecking(false);
      }
    };

    verifyUser();
  }, [navigate, setIsLoggedIn, setUserData]);

  if (isChecking) {
    return <div className="text-center p-10">Checking authentication...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
