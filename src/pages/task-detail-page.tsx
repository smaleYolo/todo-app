import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store.ts';
import {
  fetchTaskById, selectCurrentTask, selectCurrentTaskLoading
} from '../features/tasks/tasks-slice.ts';
import SpinnerLoader from '../components/loaders/SpinnerLoader.tsx';

export const TaskDetailPage = () => {
  const dispatch = useAppDispatch();

  const { taskId } = useParams();
  const taskLoading = useAppSelector(selectCurrentTaskLoading);
  const currentTask = useAppSelector(selectCurrentTask);

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskById({ taskId }));
    }
  }, [dispatch, taskId]);


  if (taskLoading === 'pending') {
    return  <SpinnerLoader />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl bg-gray-600 p-6 rounded-lg shadow-md">

        <h1 className="text-3xl font-bold text-white mb-4">{currentTask?.title}</h1>

        <p className="text-gray-300 mb-6">
          {currentTask?.description}
        </p>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <span className="text-gray-400">Status:</span>
            <span className="text-primary">{currentTask?.status}</span>
          </div>

          <div className="flex space-x-4">
            <span className="text-gray-400">Priority:</span>
            <span className="text-primary">{currentTask?.priority}</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <span className="text-gray-400">Tags:</span>
          <div className="flex space-x-2">
            {currentTask?.tags.map((tag) => (
              <span key={tag} className="bg-gray-500 text-white px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex space-x-4 justify-center">
          <button className="bg-blue-dark text-white px-4 py-2 rounded-lg">
            Edit Task
          </button>
          <button
            className="bg-danger text-white px-4 py-2 rounded-lg">
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

