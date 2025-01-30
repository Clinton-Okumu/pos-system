import React from "react";

export const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="border-b p-4">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);
