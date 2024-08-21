import React from 'react';

const DotLoader = () => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div className="w-4 h-4 bg-blue rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-blue-dark rounded-full animate-bounce delay-200"></div>
      <div className="w-4 h-4 bg-purple rounded-full animate-bounce delay-400"></div>
    </div>
  );
};

export default DotLoader;
