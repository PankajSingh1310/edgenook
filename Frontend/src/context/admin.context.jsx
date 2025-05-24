import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const adminContext = createContext();

export const useAdmin = () => {
  const context = useContext(adminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminState = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminError, setAdminError] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) return;
      try {
        const response = await axios.get('/api/admin/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setAdminData(response.data.admin);
          setIsAdminLoggedIn(true);
        } else {
          throw new Error('Invalid response');
        }
      } catch (err) {
        console.error("Failed to verify admin:", err.message);
        setAdminData(null);
        setIsAdminLoggedIn(false);
        localStorage.removeItem('adminToken');
      }
    };

    verifyAdmin();
  }, [isAdminLoggedIn]);

  return (
    <adminContext.Provider
      value={{
        adminData,
        setAdminData,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        adminError,
        setAdminError,
      }}
    >
      {children}
    </adminContext.Provider>
  );
};

export default adminContext;
