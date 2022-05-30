
export type Columns = {
    id?: string;
    title?: string;
    order: string;
  };
  
  export type Task = {
    id?: string,
    title?: string,
    order?: string,
    description?: string,
    userId?: string,
    boardId?: string,
    columnId?: string,
    files?: string,
  }
  
  export type TaskMap = {
    [key: string]: Task[];
  };