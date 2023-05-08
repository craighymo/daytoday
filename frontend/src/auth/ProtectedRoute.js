import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

// protects routes like home to be only available if a user is logged in

export const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // prevents rendering the child components until check is complete
  const [isLoading, setIsLoading] = useState(true);

  // authStatus checks the auth middleware
  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const response = await axios.get("/authStatus", {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    checkAuthenticated();
  }, []);

  if (isLoading) {
    // can insert loading animation here
    return;
  }

  // redirects to login page if auth check fails
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  // if login is successful all access is allowed
  return <Outlet />;
};
