import React, { useId } from 'react';

const Select = ({ value, onChange, options, label = '' }: {
  value: string | number,
  onChange: (e: any) => void,
  options: { value: number | string, label: string }[],
  label?: string
}) => {
  const id = useId();
  return (
    <div className="flex flex-col w-full">
      {label && <label htmlFor={id} className="text-gray-300 font-semibold mb-2">{label}</label>}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="mx-auto w-full m-2 p-4 rounded-lg bg-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-dark"
      >
        {options.map(option => (
          <option key={option.value} value={option.value} className="bg-gray-600 text-white">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
