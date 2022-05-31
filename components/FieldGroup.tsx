import React from "react";

const FieldGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  title: string;
}> = ({ children, className, title }) => {
  return (
    <div
      className={`bg-white rounded border-2 border-gray-300 px-6 py-5 mt-3 first:mt-0 ${className}`}
    >
      <h3 className="bg-gray-50 text-base font-medium rounded-t -mt-5 -mx-6 px-6 pt-4 pb-3 mb-4 border-b-2">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
};

export default FieldGroup;
