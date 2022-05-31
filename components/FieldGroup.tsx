import React from "react";

const FieldGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  title: string;
}> = ({ children, className, title }) => {
  return (
    <div className={`bg-white rounded border-2 border-gray-300 px-6 py-5 mt-3 ${className}`}>
      <h3 className="bg-gray-50 text-base font-medium rounded-t text-gray-600 -mt-5 -mx-6 px-6 pt-4 pb-3 mb-4 border-b-2">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default FieldGroup;
