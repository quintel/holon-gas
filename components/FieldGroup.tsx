import React from "react";

const FieldGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  title: string;
}> = ({ children, className, title }) => {
  return (
    <div
      className={`bg-white rounded border-2 border-gray-300 p-3 pt-4 mt-3 relative ${className}`}
    >
      <h3 className="bg-white rounded text-gray-600 px-2 -top-3 left-1 absolute">{title}</h3>
      {children}
    </div>
  );
};

export default FieldGroup;
