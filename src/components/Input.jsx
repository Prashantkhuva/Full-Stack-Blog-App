import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, lable, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  const inputLabel = label || lable;

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

      <input
        type={type}
        className={`w-full rounded-2xl border border-border bg-bg-secondary px-4 py-3.5 text-text outline-none transition-all duration-300 placeholder:text-text-muted/50 focus:-translate-y-0.5 focus:border-accent focus:ring-1 focus:ring-accent ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
