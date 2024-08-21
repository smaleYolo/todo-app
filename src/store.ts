import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './features/auth/auth-slice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { tasksSlice } from './features/tasks/tasks-slice.ts';
import { userSlice } from './features/user/user-slice.ts';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tasks: tasksSlice.reducer,
    user: userSlice.reducer,
  },
})

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();