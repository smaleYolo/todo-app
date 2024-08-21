import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage, ProfilePage, RegisterPage, TaskDetailPage, TasksPage } from '@pages';
import { EditTaskPage } from '../pages/edit-task-page.tsx';


export const AuthRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={<LoginPage />}
    />
    <Route
      path="/register"
      element={<RegisterPage />}
    />
    <Route
      path="*"
      element={<Navigate to="/" />}
    />
  </Routes>
);

export const MainRoutes = () => (
  <Routes>
    <Route
      path="/tasks"
      element={<TasksPage />}
    />
    <Route
      path="/tasks/:taskId"
      element={<TaskDetailPage />}
    />
      <Route
        path="/tasks/:taskId/edit"
        element={<EditTaskPage />}
      />
    <Route
      path="/profile"
      element={<ProfilePage />}
    />
    <Route
      path="*"
      element={<Navigate to="/tasks" />}
    />
  </Routes>
);