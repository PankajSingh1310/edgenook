import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const userContext = createContext();

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserState = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await axios.get('api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUserData(response.data.user);
          setIsLoggedIn(true);
        } else {
          throw new Error('Invalid response');
        }
      } catch (err) {
        console.error("Failed to verify user:", err.message);
        setUserData(null);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
      }
    };

    verifyUser();
  }, [isLoggedIn]);

  return (
    <userContext.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        error,
        setError,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default userContext;
