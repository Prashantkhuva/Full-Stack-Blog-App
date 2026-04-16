import { motion } from "framer-motion";
import React from "react";
import { SignUp as SignupComponent } from "../components";

function Signup() {
  return (
    <motion.div
      className="min-h-[85vh] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SignupComponent />
    </motion.div>
  );
}

export default Signup;
