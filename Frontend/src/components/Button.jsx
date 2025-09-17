// src/components/Button.jsx
import React from "react";

export const Button = ({ label }) => {
  return (
    <button className="w-full bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-secondary transition-all">
      {label}
    </button>
  );
};