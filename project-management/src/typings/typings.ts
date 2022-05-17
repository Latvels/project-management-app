export interface User {
  id?: string;
  password?: string;
  name?: string;
  login?: string;
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
  title: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
}

export interface File {
  taskId: string;
  file: string; // бинарно
}
