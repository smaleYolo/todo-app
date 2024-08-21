import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/inputs/input.tsx';
import { Button } from '../components/buttons/button.tsx';
import Select from '../components/inputs/select.tsx';
import {
  fetchTaskById,
  selectCurrentTask,
  selectCurrentTaskLoading,
  updateTask
} from '../features/tasks/tasks-slice.ts';
import SpinnerLoader from '../components/loaders/SpinnerLoader.tsx';
import { useAppDispatch, useAppSelector } from '../store.ts';
import { PriorityMeans, PriorityValues, ReversePriorityValues, TaskStatuses } from '@models';
import toast from 'react-hot-toast';

export interface ITaskEditingValues {
  title: string,
  description: string,
  priority: PriorityMeans,
  status: TaskStatuses,
  tags: string,
}

export const EditTaskPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { taskId } = useParams();
  const taskLoading = useAppSelector(selectCurrentTaskLoading);
  const currentTask = useAppSelector(selectCurrentTask);

  const [formValues, setFormValues] = useState<ITaskEditingValues>({
    title: '',
    description: '',
    priority: 'Low',
    status: '',
    tags: '',
  });

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskById({ taskId }));
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    if(currentTask){
      const initialFormValues = {
        title: currentTask.title,
        description: currentTask.description,
        priority: PriorityValues[currentTask.priority],
        status: currentTask.status,
        tags: currentTask.tags.join(','),
      };
      setFormValues(initialFormValues);
      setIsChanged(false); // Reset the change state when the task is loaded
    }
  }, [currentTask]);

  const handleChange = (field: keyof ITaskEditingValues, value: string | PriorityMeans) => {
    setFormValues(prevValues => {
      const updatedValues = { ...prevValues, [field]: value };
      setIsChanged(JSON.stringify(updatedValues) !== JSON.stringify({
        title: currentTask?.title || '',
        description: currentTask?.description || '',
        priority: PriorityValues[currentTask?.priority || 1],
        status: currentTask?.status || 'Opened',
        tags: currentTask?.tags.join(',') || '',
      }));
      return updatedValues;
    });
  };

  const handleSave = () => {
    if (taskId) {
      dispatch(updateTask({taskId: taskId, values: {
          ...formValues,
          priority: ReversePriorityValues[formValues.priority],
          tags: formValues.tags.split(',').map(e => e.trim()).filter(e => e !== '')
        }}));
      navigate('/tasks');
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  if (taskLoading === 'pending') {
    return  <SpinnerLoader />
  }

  if (!currentTask) {
    toast.error('Task not found');
    navigate('/tasks');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl bg-gray-600 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-white mb-4">Edit Task</h1>

        <div className="mb-4">
          <Input
            value={formValues.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('title', e.target.value)}
            placeholder={'Task Title'}
            type="text"
            label="Title"
          />
        </div>

        <div className="mb-4">
          <Input
            value={formValues.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('description', e.target.value)}
            placeholder={'Task Description'}
            type="textarea"
            label="Description"
          />
        </div>

        <div className="mb-4">
          <Select
            label="Priority"
            value={formValues.priority}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('priority', e.target.value as PriorityMeans)}
            options={[
              { value: 'Low', label: 'Low' },
              { value: 'Medium', label: 'Medium' },
              { value: 'High', label: 'High' }
            ]}
          />
        </div>

        <div className="mb-4">
          <Select
            label="Status"
            value={formValues.status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('status', e.target.value as TaskStatuses)}
            options={[
              { value: 'Opened', label: 'Opened' },
              { value: 'Completed', label: 'Completed' }
            ]}
          />
        </div>

        <div className="mb-4">
          <Input
            value={formValues.tags}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('tags', e.target.value)}
            placeholder={'Tags (comma separated)'}
            type="text"
            label="Tags"
          />
        </div>

        <div className="mt-6 flex space-x-4 justify-center">
            <Button
              disabled={!isChanged}
              variant='confirm'
              onClick={handleSave}
            >Save</Button>
          <Button
            variant='danger'
            onClick={handleCancel}
          >Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;