import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthRoutes, MainRoutes } from '@routes';
import { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from './store.ts';
import { checkIsAuth, selectIsAuth } from './features/auth/auth-slice.ts';
import { Header } from './components/header.tsx';

const App = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    dispatch(checkIsAuth());
  }, [dispatch]);

  return (
      <BrowserRouter>
        <Header />
          {isAuth ? <MainRoutes /> : <AuthRoutes />}
        <Toaster position="top-right" />
      </BrowserRouter>
  );
};

export default App;
