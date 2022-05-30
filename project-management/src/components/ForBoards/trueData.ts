import type { Columns, Task, TaskMap } from './trueType';

export const columns: Columns[] = [
  {
    id: '1',
    title: 'Column1',
    order: '1',
  },
  {
    id: '2',
    title: 'Column2',
    order: '2',
  },
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'column2 task1',
    order: '2',
    description: 'string1',
  },
  {
    id: '2',
    title: 'column1 task 1',
    order: '1',
    description: 'string2',
  },
  {
    id: '3',
    title: 'column1 task 2',
    order: '1',
    description: 'string3',
  },
];

export const getTask = (count: number): Task[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Task = tasks[Math.floor(Math.random() * tasks.length)];

    const custom: Task = {
      ...random,
    };

    return custom;
  });

export const getColumns = (count: number): Columns[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Columns = columns[Math.floor(Math.random() * columns.length)];

    const custom: Columns = {
      ...random,
    };

    return custom;
  });

const getByColumns = (colum: Columns, items: Task[]): Task[] =>
  items.filter((quote: Task) => quote.order === colum.order);

export const columTaskMap: TaskMap = columns.reduce(
  (previous: TaskMap, column: Columns) => ({
    ...previous,
    [column.order]: getByColumns(column, tasks),
  }),
  {}
);
