import { button } from "framer-motion/client";
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
      className={`px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide transition-colors hover:opacity-90 ${className} ${bgColor} ${textColor}`}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children || "Button"}
    </motion.button>
  );
}

export default Button;
