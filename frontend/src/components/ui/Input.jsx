import React from "react";

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  className,
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`p-2 border rounded-md w-full ${className}`}
  />
);
