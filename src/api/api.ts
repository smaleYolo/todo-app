import { api } from './settings.ts';
import { ILoginValues, IRegisterValues, ISuccessResponse } from '@models';


export const endpoints = {
  register: ({ username, password, name }: IRegisterValues) => {
    return api.post<ISuccessResponse, IRegisterValues>('/auth/register', {
      username, password, name
    });
  },

  login: ({ username, password }: ILoginValues) => {
    return api.post<ISuccessResponse, ILoginValues>('/auth/login', {
      username, password
    });
  },
};