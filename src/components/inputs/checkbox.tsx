import React, { useState } from 'react';

const Checkbox = ({ checked = true, onChange = () => {} }: {checked: boolean, onChange: () => void}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`cursor-pointer w-6 h-6 flex items-center justify-center border-2 rounded-full ${
        checked ? 'bg-blue-dark border-blue-dark' : 'border-blue'
      } ${isHovered ? 'border-blue-dark' : ''}`}
      onClick={onChange}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {checked && (
        <svg
          className="w-4 h-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.297a1 1 0 00-1.414 0l-7.293 7.293-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
};

export default Checkbox;
