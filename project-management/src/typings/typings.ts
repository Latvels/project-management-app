export interface User {
  id?: string;
  password?: string;
  name?: string;
  login?: string;
  token?: string;
}

export interface Board {
  id?: string;
  title?: string;
  description?: string;
}

export interface Column {
  title?: string;
  order?: number;
  id?: string;
  idBoard?: string;
}

export interface Task {
  title?: string;
  done?: boolean;
  order?: number;
  description?: string;
  userId?: string;
  boardId?: string;
  columnId?: string;
  id?: string;
  files?: string;
}

export interface File {
  taskId?: string;
  file?: string; // бинарно
}

export type reqState = {
  entities: All[];
  loading: 'idle' | 'pending';
  signInStatus?: 'fulfilled' | 'pending' | 'rejected' | null;
  signUpStatus?: 'fulfilled' | 'pending' | 'rejected' | null;
  currentRequestId: string | undefined;
  error: Error | null;
};

export interface Error {
  status: number;
  message: string;
}

export interface All {
  id?: string;
  title?: string;
  description?: string;
  taskId?: string;
  file?: string; // бинарно
  done?: boolean;
  order?: number;
  userId?: string;
  boardId?: string;
  columnId?: string;
  files?: string;
  password?: string;
  name?: string;
  login?: string;
  token?: string;
  idBoard?: string;
}
