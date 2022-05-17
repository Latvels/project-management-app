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
  entities: Board[]
  loading: 'idle' | 'pending'
  currentRequestId: string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: Error
}

export interface Error {
  status: number
  message: string
}
