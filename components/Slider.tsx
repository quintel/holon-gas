import React from "react";

const Slider: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <p className="pt-2 pb-1">{name}</p>
      <div className="bg-gray-300 rounded h-1 relative my-1">
        <div className="bg-gray-400 rounded-full h-3 w-3 absolute left-10 -top-1" />
      </div>
    </div>
  );
};

export default Slider;
