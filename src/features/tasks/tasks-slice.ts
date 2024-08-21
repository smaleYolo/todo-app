import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITask, IUpdateTaskValues } from '@models';
import { api } from '@api';
import { LoadingStatuses } from '../../models/settings.ts';
import toast from 'react-hot-toast';

interface TasksState {
  tasksList: ITask[],
  currentTask: ITask | null,
  loading: LoadingStatuses,
  currentTaskLoading: LoadingStatuses,
  error?: string;
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, thunkAPI) => {
    try {
      return await api.getAllTasks();
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message || 'Failed fetching user tasks');
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async ({ taskId }: { taskId: ITask['id'] }, thunkAPI) => {
    try {
      return await api.getTaskById(taskId);
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message || 'Failed fetching user task by id');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, values }: { taskId: ITask['id'], values: IUpdateTaskValues }, thunkAPI) => {
    try {
      return await api.updateTask(taskId, values);
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message || 'Failed toggle task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ taskId }: { taskId: ITask['id'] }, thunkAPI) => {
    try {
      return await api.deleteTask(taskId);
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message || 'Failed delete task');
    }
  }
);


const initialState: TasksState = {
  tasksList: [],
  currentTask: null,
  loading: 'idle',
  currentTaskLoading: 'idle',
  error: undefined
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  selectors: {
    selectTasksLoading: state => state.loading,
    selectCurrentTaskLoading: state => state.currentTaskLoading,
    selectCurrentTask: state => state.currentTask,
    selectTasks: state => state.tasksList,
    selectTotalTasks: state => state.tasksList.length
  },
  reducers: {
  }, extraReducers: builder => {
    //FetchTasks
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasksList = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to fetch tasks';

      toast.error('Failed to fetch tasks')
    });

    //FetchTaskById
    builder.addCase(fetchTaskById.fulfilled, (state, action) => {
      state.currentTask = action.payload;
      state.currentTaskLoading = 'succeeded';
    });
    builder.addCase(fetchTaskById.pending, (state) => {
      state.currentTaskLoading = 'pending';
    });
    builder.addCase(fetchTaskById.rejected, (state, action) => {
      state.currentTaskLoading = 'failed';
      state.error = action.error.message || 'Failed to fetch task by id';

      toast.error('Failed to fetch tasks by id')
    });

    //UpdateTask
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const updatedTask = action.payload;
      state.tasksList = state.tasksList.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );
      toast.success('Task updated successfully!')
      state.loading = 'succeeded';
    });
    builder.addCase(updateTask.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed update task';

      toast.error('Failed update task')
    });


    //Delete Task
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const { taskId: deletedTaskId } = action.meta.arg;
      state.tasksList = state.tasksList.filter(task => task.id !== deletedTaskId);
      state.loading = 'succeeded';

      toast.success('Task deleted successfully!')
    });
    builder.addCase(deleteTask.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed delete task';

      toast.error('Failed delete task')
    });
  }
});

export const {} = tasksSlice.actions;
export const {
  selectTasksLoading,
  selectTasks,
  selectTotalTasks,
  selectCurrentTask,
  selectCurrentTaskLoading
} = tasksSlice.selectors;

export default tasksSlice.reducer;