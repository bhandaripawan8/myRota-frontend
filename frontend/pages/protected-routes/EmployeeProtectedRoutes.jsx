import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/auth/getuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;
        console.log(user.role); 

        if (user.role === 'employee') {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>; 
  }

  if (!isAuthorized) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;