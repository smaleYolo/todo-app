import React from 'react';

export const Button = ({btn_text, isAddBtn, onClick}: {btn_text: string, isAddBtn: boolean, onClick: () => void}) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue m-2 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded flex items-center justify-center">
      {btn_text && (<span>{btn_text}</span>)}
      {isAddBtn && (<>Add <span className="ml-2">+</span></>)}
    </button>
  );
};
