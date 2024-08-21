import React from 'react';
import { useAppSelector } from '../store.ts';
import { selectTasks, selectTotalTasks } from '../features/tasks/tasks-slice.ts';
import Input from '../components/inputs/input.tsx';
import { TasksList } from '../components/tasks-list.tsx';

export const TasksPage = () => {
  const totalTasks = useAppSelector(selectTotalTasks);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-gray-700 p-6 rounded-lg shadow-lg">
        <Input
          value={''}
          onChange={() => {}}
          placeholder={'Search for todo...'}
          type="text"
        />

        {totalTasks ? (
          <span className="block text-center mb-4 text-white font-semibold">
            Total todos: {totalTasks}
          </span>
        ) : null}

        <TasksList />
      </div>
    </div>
  );
};
