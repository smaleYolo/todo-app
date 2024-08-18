import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Button } from '../components/buttons/button.tsx';
import Input from '../components/inputs/input.tsx';

import { api, endpoints } from '@api';
import { IRegisterValues, ISuccessResponse } from '@models';
import { useAppDispatch } from '../store.ts';
import { loginUser } from '../features/auth/auth-slice.ts';


export const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState<IRegisterValues>({
    username: '',
    password: '',
    name: ''
  });

  const handleRegister = async () => {
    try {
      const { token } = await endpoints.register({
        username: userData.username,
        name: userData.name,
        password: userData.password
      });

      dispatch(loginUser({ token: token }));

      setUserData({
        username: '',
        password: '',
        name: ''
      });
      toast.success('Registration successful!');
    } catch (error) {
      toast.error(`Registration failed. Please try again. Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-700 p-8 rounded-lg shadow-lg">
      <div>
        <h2 className="text-white text-2xl font-bold mb-4">Register</h2>
        <Input
          value={userData.username}
          onChange={(e) => setUserData(prevState => {
            return {
              ...prevState,
              username: e.target.value
            };
          })}
          placeholder="Username"
          type="text"
        />
        <Input
          value={userData.name}
          onChange={(e) => setUserData(prevState => {
            return {
              ...prevState,
              name: e.target.value
            };
          })}
          placeholder="Name"
          type="text"
        />
        <Input
          value={userData.password}
          onChange={(e) => setUserData(prevState => {
            return {
              ...prevState,
              password: e.target.value
            };
          })}
          placeholder="Password"
          type="password"
        />
        <Button btn_text="Register" isAddBtn={false} onClick={handleRegister} />
      </div>
      <Link to={'/'}><span className="hover:text-gray-600 cursor-pointer">Already have an account?</span></Link>
    </div>
  );
};

