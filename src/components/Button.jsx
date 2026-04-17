import React from "react";
import { motion } from "framer-motion";

function Button({
  children,
  type = "button",
  bgColor = "bg-accent",
  textColor = "text-bg",
  className = "",
  ...props
}) {
  return (
    <motion.button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] shadow-[0_12px_34px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(0,0,0,0.3)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none ${className} ${bgColor} ${textColor}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children || "Button"}
    </motion.button>
  );
}

export default Button;
