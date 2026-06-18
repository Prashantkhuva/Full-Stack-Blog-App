import React, { useId, useState, useEffect } from "react";
import { motion } from "framer-motion";

const shakeVariants = {
  shake: {
    x: [0, -5, 5, -5, 5, -3, 3, 0],
    transition: { duration: 0.45, ease: "easeInOut" },
  },
};

const Input = React.forwardRef(function Input(
  { label, lable, type = "text", className = "", error, ...props },
  ref,
) {
  const id = useId();
  const inputLabel = label || lable;
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    if (error) setShakeKey((k) => k + 1);
  }, [error]);

  return (
    <div className="w-full">
      {inputLabel && (
        <label
          htmlFor={id}
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-text-muted"
        >
          {inputLabel}
        </label>
      )}

      <motion.div
        key={shakeKey}
        animate={error ? "shake" : undefined}
        variants={shakeVariants}
      >
        <input
          type={type}
          className={`w-full rounded-2xl border bg-bg-secondary px-4 py-3.5 text-text outline-none transition-all duration-300 placeholder:text-text-muted/50 focus:-translate-y-0.5 focus:ring-1 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
              : "border-border focus:border-accent focus:ring-accent/50"
          } ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
      </motion.div>

      {error && (
        <motion.p
          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <svg
            className="h-3.5 w-3.5 shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 1C4.134 1 1 4.134 1 8s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zM7 5a1 1 0 012 0v4a1 1 0 01-2 0V5zm1 7.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
          </svg>
          <span>{error}</span>
        </motion.p>
      )}
    </div>
  );
});

export default Input;
