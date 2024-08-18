import React from 'react';
import DeleteButton from './buttons/delete-button.tsx';
import Checkbox from './inputs/checkbox.tsx';

const TaskItem = ({ taskText, isCompleted, onToggle, onDelete }: {
  taskText: string,
  isCompleted: boolean,
  onToggle: () => void,
  onDelete: () => void
}) => {
  return (
    <div
      className={`flex justify-between items-center p-4 m-2 rounded-lg bg-gray-500 ${
        isCompleted ? ' text-gray-300 line-through' : 'text-white'
      }`}
    >
      <div className="flex items-center">
        <Checkbox checked={isCompleted} onChange={() => {}}/>

        <span className="ml-4">{taskText}</span>
      </div>

      <DeleteButton onClick={() => {}}/>

    </div>
  );
};

export default TaskItem;
