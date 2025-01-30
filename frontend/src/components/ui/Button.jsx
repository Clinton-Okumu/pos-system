import React from "react";

export const Button = ({
  children,
  onClick,
  type = "button",
  className,
  variant = "filled",
}) => {
  const buttonClass =
    variant === "outline"
      ? "border-2 border-gray-600 text-gray-600 bg-transparent"
      : "bg-blue-600 text-white";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClass} p-2 rounded-md ${className}`}
    >
      {children}
    </button>
  );
};
