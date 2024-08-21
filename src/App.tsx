import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import { AuthRoutes, MainRoutes } from '@routes';
import { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from './store.ts';
import { checkIsAuth, logout, selectIsAuth } from './features/auth/auth-slice.ts';
import { Button } from './components/buttons/button.tsx';
import SpinnerLoader from './components/loaders/SpinnerLoader.tsx';

const App = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(checkIsAuth());
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return (
        <SpinnerLoader />
    );
  }

  return (
    <BrowserRouter>
      {isAuth && <Button btn_text={'Exit'} isAddBtn={false} onClick={() => dispatch(logout())}/>}
      {isAuth ? <MainRoutes /> : <AuthRoutes />}
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
