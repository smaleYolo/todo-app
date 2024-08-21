import { request } from './settings.ts';
import {
  ICreateTaskValues,
  ILoginValues,
  IRegisterValues,
  ISuccessAuthResponse,
  ITask, IUpdateTaskValues, Tag
} from '@models';


export const api = {

  //Auth endpoints
  register: ({ username, password, name }: IRegisterValues) => {
    return request.post<ISuccessAuthResponse, IRegisterValues>('/auth/register', {
      username, password, name
    });
  },

  login: ({ username, password }: ILoginValues) => {
    return request.post<ISuccessAuthResponse, ILoginValues>('/auth/login', {
      username, password
    });
  },


  //Tasks Endpoints
  createTask: (task: ICreateTaskValues) => {
    return request.post<ITask, ICreateTaskValues>('/tasks', task);
  },

  getAllTasks: () => {
    return request.get<ITask[]>('/tasks');
  },

  getTaskById: (taskId: ITask['id']) => {
    return request.get<ITask>(`/tasks/${taskId}`);
  },

  updateTask: (taskId: ITask['id'], values: IUpdateTaskValues) => {
    return request.patch<ITask, IUpdateTaskValues>(`/tasks/${taskId}`, values);
  },

  deleteTask: (taskId: ITask['id']) => {
    return request.delete<ITask>(`/tasks/${taskId}`);
  },

  getAllTags: () => {
    return request.get<Tag[]>('/tags');
  }
};