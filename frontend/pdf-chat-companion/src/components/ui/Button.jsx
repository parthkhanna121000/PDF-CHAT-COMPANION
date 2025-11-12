import React from "react";

/**
 * A reusable button component.
 *
 * It uses React.forwardRef to allow parent components to pass a ref.
 *
 * It merges base styles with any additional `className` you pass as a prop.
 */
const Button = React.forwardRef(
  ({ className, children, type = "button", ...props }, ref) => {
    // Base styles for the button
    const baseStyles =
      "inline-flex items-center justify-center px-4 py-2 font-semibold text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200";

    return (
      <button
        type={type}
        // Combine base styles with any custom className prop
        className={`${baseStyles} ${className || ""}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// Add a display name for better debugging
Button.displayName = "Button";

export default Button;
