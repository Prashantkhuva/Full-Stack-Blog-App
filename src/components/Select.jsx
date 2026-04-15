import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-muted mb-2"
        ></label>
      )}

      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 py-3 rounded-lg bg-bg-secondary text-text border border-border outline-none focus:border-accent focus:ring-1 focus:ring-accent duration-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
