import React from 'react';

const Input = ({ value, onChange, placeholder, type }: {value: string, onChange: (e: any) => void, placeholder: string, type: string}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mx-auto w-full m-2 p-4 rounded-lg bg-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-dark"
    />
  );
};

export default Input;