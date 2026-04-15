import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");

    try {
      const session = await authService.createAccount(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) dispatch(authLogin(userData));

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center w-full px-4 py-8">
      <motion.div
        className="mx-auto w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-bg-card border border-border rounded-2xl p-8 md:p-10 shadow-2xl">
          <div className="mb-6 flex justify-center">
            <Logo width="120px" />
          </div>

          <motion.h2
            className="text-center font-heading text-3xl font-bold text-text mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create Account
          </motion.h2>

          <motion.p
            className="text-center text-text-muted mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Join <span className="text-accent">MegaBlog</span> today
          </motion.p>

          {error && (
            <motion.p
              className="text-red-500 text-center mb-6 text-sm bg-red-500/10 border border-red-500/20 rounded-lg py-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}

          <form onSubmit={handleSubmit(create)} className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              className="dark-input"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              className="dark-input"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Please enter a valid email address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              className="dark-input"
              {...register("password", {
                required: true,
              })}
            />

            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent-hover text-bg font-semibold"
              >
                Create Account
              </Button>
            </motion.div>
          </form>

          <p className="text-center text-text-muted mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-accent font-medium hover:underline transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUp;
