import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode, onClick: () => void, disabled?: boolean, variant?: ButtonVariant
}

export type ButtonVariant = 'primary' | 'danger' | 'confirm';

export const Button = ({ children, onClick, disabled = false, variant = 'primary' }: ButtonProps) => {

  const baseStyle = "m-2 text-white font-bold py-2 px-4 rounded flex items-center justify-center";
  const variantStyle = {
    primary: "bg-blue-500 hover:bg-blue-700",
    danger: "bg-red-500 hover:bg-red-700",
    confirm: "bg-green-500 hover:bg-green-700"
  };
  const disabledStyle = "bg-gray-400 cursor-not-allowed";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${disabled ? disabledStyle : variantStyle[variant]}`}
    >
      {children && (<span>{children}</span>)}
    </button>
  );
};
