import { React, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

// logs user out and redirects to login page

function Logout() {
  const handleLogout = async () => {
    try {
      await axios.get("/logout", {
        withCredentials: true,
      });
      console.log("Logged out");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <Navigate to={"/login"} />;
}

export default Logout;
