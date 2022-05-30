import React from "react";

const FieldGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  title: string;
}> = ({ children, className, title }) => {
  return (
    <div
      className={`bg-white rounded border-2 border-gray-300 p-6 pb-5 mt-3 relative ${className}`}
    >
      <h3 className="bg-white text-lg rounded text-gray-600 px-2 -top-3.5 left-4 absolute">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default FieldGroup;
