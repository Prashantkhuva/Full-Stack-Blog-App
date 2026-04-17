import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { motion } from "framer-motion";

function LogOutBtn({ className = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/login");
      })
      .catch((error) =>
        console.log("LogoutBtn :: logoutHandler :: error", error),
      );
  };

  return (
    <motion.button
      onClick={logoutHandler}
      className={`px-5 py-2 text-sm font-medium text-text border border-border rounded-lg hover:border-accent hover:text-accent transition-all duration-200 ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      Logout
    </motion.button>
  );
}

export default LogOutBtn;
