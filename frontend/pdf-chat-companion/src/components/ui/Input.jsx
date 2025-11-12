import React from "react";

/**
 * A reusable input component.
 *
 * It uses React.forwardRef so that you can pass a ref to it
 * from a parent component (useful for forms).
 *
 * It also merges a set of base styles with any additional
 * `className` you pass in as a prop.
 */
const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    // Base styles for the input
    const baseStyles =
      "block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed";

    return (
      <input
        type={type}
        // Combine base styles with any custom className prop
        className={`${baseStyles} ${className || ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);

// Add a display name for better debugging in React DevTools
Input.displayName = "Input";

export default Input;
