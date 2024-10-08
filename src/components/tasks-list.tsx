import React, { useEffect } from 'react';
import SpinnerLoader from './loaders/SpinnerLoader.tsx';
import TaskItem from './task-item.tsx';
import { ITask, Tag } from '@models';
import { deleteTask, fetchTasks, selectTasks, selectTasksLoading, updateTask } from '../features/tasks/tasks-slice.ts';
import { useAppDispatch, useAppSelector } from '../store.ts';

export const TasksList = ({ searchValue, selectedTag }: { searchValue: string, selectedTag: Tag | null }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectTasksLoading);
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchTasks());
    }
  }, [dispatch, loading]);

  const toggleTaskHandler = ({ taskId, taskStatus }: { taskId: ITask['id'], taskStatus: ITask['status'] }) => {
    dispatch(updateTask({
      taskId: taskId,
      values: taskStatus === 'Opened' ? { status: 'Completed' } : { status: 'Opened' }
    }));
  };

  const deleteTaskHandler = ({ taskId }: { taskId: ITask['id'] }) => {
    dispatch(deleteTask({ taskId: taskId }));
  };

  const tasksList = tasks
    .filter(task =>
      selectedTag && selectedTag !== 'Показать все' ? task.tags.includes(selectedTag) : true
    )
    .filter(task =>
      searchValue ?
        task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        task.description.toLowerCase().includes(searchValue.toLowerCase())
        : true
    );


  return (
    <div
      className="flex flex-col space-y-4 p-4 rounded-lg h-[400px] overflow-auto shadow-inner">
      {
        loading === 'pending' ? (
          <div className="flex justify-center items-center h-full">
            <SpinnerLoader />
          </div>
        ) : tasksList.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-300 text-center">No tasks available. Start by adding a new task!</p>
          </div>
        ) : (
          tasksList.map(task => (
            <TaskItem
              key={task.id}
              taskId={task.id}
              taskText={task.title}
              status={task.status}
              onToggle={() => toggleTaskHandler({ taskId: task.id, taskStatus: task.status })}
              onDelete={() => deleteTaskHandler({ taskId: task.id })}
            />
          ))
        )
      }
    </div>
  );
};
