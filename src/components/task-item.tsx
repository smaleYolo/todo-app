import React from 'react';
import DeleteButton from './buttons/delete-button.tsx';
import Checkbox from './inputs/checkbox.tsx';
import { ITask, TaskStatuses } from '@models';
import { Link } from 'react-router-dom';

const TaskItem = ({ taskText, status, onToggle, onDelete, taskId }: {
  taskId: ITask['id'],
  taskText: string,
  status: TaskStatuses,
  onToggle: () => void,
  onDelete: () => void
}) => {

  return (
    <div
      className={`flex justify-between items-center p-4 bg-gray-500 rounded-lg transition-all duration-300 ease-in-out ${
        status === 'Completed' ? 'text-gray-300 line-through' : 'text-white'
      }`}
    >
      <div className="flex items-center space-x-4">
        <Checkbox checked={status === 'Completed'} onChange={onToggle} />

        <Link to={`/tasks/${taskId}`}>
          <span
            className="cursor-pointer hover:text-gray-200 transition duration-200"
          >
          {taskText}
        </span>
        </Link>
      </div>

      <DeleteButton onClick={onDelete} />
    </div>
  );
};

export default TaskItem;
