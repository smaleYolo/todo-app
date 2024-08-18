import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import Input from '../components/inputs/input.tsx';
import { Button } from '../components/buttons/button.tsx';

import { endpoints } from '@api';
import { ILoginValues } from '@models';
import { loginUser } from '../features/auth/auth-slice.ts';
import { useAppDispatch } from '../store.ts';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<ILoginValues>({
    username: '',
    password: ''
  })

  const handleLogin = async () => {
   try {
     const { token } = await endpoints.login({username: userData.username, password: userData.password})
     dispatch(loginUser({ token: token }));

     toast.success('Login successful!');
   } catch (err) {
     toast.error(`Login failed. Please try again. Error: ${(err as Error).message}`)
   }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-700 p-8 rounded-lg shadow-lg">
      <div>
        <h2 className="text-white text-2xl font-bold mb-4">Login</h2>
        <Input
          value={userData.username}
          onChange={(e) => setUserData(prevState => {
            return {
              ...prevState,
              username: e.target.value,
            }
          })}
          placeholder="Username"
          type='text'
        />
        <Input
          value={userData.password}
          onChange={(e) => setUserData(prevState => {
            return {
              ...prevState,
              password: e.target.value,
            }
          })}
          placeholder="Password"
          type='password'
        />
        <Button btn_text="Login" isAddBtn={false} onClick={handleLogin} />
      </div>
        <Link to={'/register'}><span className='hover:text-gray-600 cursor-pointer'>Dont have an account yet?</span></Link>
    </div>
  );
};

