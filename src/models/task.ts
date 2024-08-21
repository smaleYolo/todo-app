export type TaskStatuses = 'Opened' | 'In Progress' | 'Completed' | string;
export type Tag = string
export type Priority = 1 | 2 | 3;
export type PriorityMeans = 'Low' | 'Medium' | 'High';

export const PriorityValues: Record<Priority, PriorityMeans> = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
};

export const ReversePriorityValues: Record<PriorityMeans, Priority> = {
  'Low': 1,
  'Medium': 2,
  'High': 3,
};

export interface ICreateTaskValues {
  title: string;
  description: string;
  priority: Priority;
  tags: Tag[];
}

export interface IUpdateTaskValues {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: Priority;
  tags?: Tag[];
}


export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatuses;
  priority: Priority;
  created_at: string;
  updated_at: string;
  user_id: string;
  tags: Tag[];
}