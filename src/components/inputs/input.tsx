import React, { useId } from 'react';

const Input = ({ value, onChange, placeholder, type, label = '' }: {
  value: string,
  onChange: (e: any) => void,
  placeholder: string,
  type: string,
  label?: string
}) => {
  const id = useId();
  return (
    <div className="flex flex-col w-full">
      {label && <label htmlFor={id} className="text-gray-300 font-semibold mb-2">{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mx-auto w-full m-2 p-4 rounded-lg bg-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-dark"
      />
    </div>
  );
};

export default Input;
