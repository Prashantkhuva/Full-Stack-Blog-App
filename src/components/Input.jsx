import { div, input } from "framer-motion/client";
import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { lable, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full">
      {lable && (
        <lable
          htmlFor={id}
          classname="block text-sm font-medium text-text-muted mb-2"
        >
          {lable}
        </lable>
      )}

      <input
        type={type}
        className={`px-4 py-3 rounded-lg bg-bg-secondary text-text border border-border outline-none focus:border-accent focus:ring-1 focus:ring-accent duration-200 w-full placeholder:text-text-muted/50 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
