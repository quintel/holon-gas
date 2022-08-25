import React from "react";

const FieldGroup: React.FC<{
  id?: string;
  children: React.ReactNode;
  className?: string;
  title: string;
}> = ({ id, children, className, title }) => {
  return (
    <div
      id={id}
      className={`mt-3 rounded border-2 border-gray-300 bg-white px-6 py-5 first:mt-0 ${className}`}
    >
      <h3 className="sticky -top-px z-10 -mx-6 -mt-5 mb-4 rounded-t border-b-2 bg-gray-50 px-6 pt-3.5 pb-3 text-base font-medium">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
};

export default FieldGroup;
