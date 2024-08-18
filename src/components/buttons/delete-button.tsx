import React from 'react';

const DeleteButton = ({ onClick }: { onClick: (e: React.FormEvent) => void }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-300 active:scale-105 hover:bg-gray-600 text-gray-400 hover:text-danger p-2 rounded flex items-center justify-center"
    >
      <svg
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h14a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zM4 7a1 1 0 011-1h10a1 1 0 011 1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
      </svg>
    </button>
  );
};

export default DeleteButton;
