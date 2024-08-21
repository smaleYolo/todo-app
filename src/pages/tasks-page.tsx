import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store.ts';
import { selectTotalTasks } from '../features/tasks/tasks-slice.ts';
import Input from '../components/inputs/input.tsx';
import { TasksList } from '../components/tasks-list.tsx';
import { fetchUserTags, selectTags } from '../features/user/user-slice.ts';
import { TagList } from '../components/tags-list.tsx';

export const TasksPage = () => {
  const dispatch = useAppDispatch();
  const totalTasks = useAppSelector(selectTotalTasks);
  const tags = useAppSelector(selectTags);

  const [searchValue, setSearchValue] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>('Показать все');

  useEffect(() => {
    dispatch(fetchUserTags());
  }, [dispatch]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-gray-700 p-6 rounded-lg shadow-lg">
        <Input
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          placeholder={'Search for todo...'}
          type="text"
        />

        {totalTasks ? (
          <span className="block text-center mb-4 text-white font-semibold">
            Total todos: {totalTasks}
          </span>
        ) : null}

        {tags.length > 0 && (
          <TagList tags={['Показать все',...tags]} onTagClick={handleTagClick} isSelected={selectedTag}/>
        )}

        <TasksList searchValue={searchValue} selectedTag={selectedTag} />
      </div>
    </div>
  );
};

export default TasksPage;