import type { Column, Quote, QuoteMap } from './testTypes';

const Column1: Column = {
  id: '1',
  name: 'Column1',
};

const Column2: Column = {
  id: '2',
  name: 'Column2',
};

const Column3: Column = {
  id: '3',
  name: 'Column3',
};

const Column4: Column = {
  id: '4',
  name: 'Column4',
};

export const columns: Column[] = [Column1, Column2, Column3, Column4];

export const quotes: Quote[] = [
  {
    id: '1',
    content: 'column2 task1',
    author: Column2,
  },
  {
    id: '2',
    content: 'column1 task 1',
    author: Column1,
  },
  {
    id: '3',
    content: 'column1 task 2',
    author: Column1,
  },
  {
    id: '4',
    content: 'column3 task 1',
    author: Column3,
  },
  {
    id: '5',
    content: 'column3 task 2',
    author: Column3,
  },
  {
    id: '6',
    content: 'column4 task 1',
    author: Column4,
  },
  {
    id: '7',
    content: 'column4 task 2',
    author: Column4,
  },
  {
    id: '8',
    content:
      'column3 task 3',
    author: Column3,
  },
  {
    id: '9',
    content: 'column3 task 4',
    author: Column3,
  },
  {
    id: '10',
    content: 'column4 task 3',
    author: Column4,
  },
  {
    id: '11',
    content: 'column4 task 4',
    author: Column4,
  },
  {
    id: '12',
    content: 'column4 task 5',
    author: Column4,
  },
];

// So we do not have any clashes with our hardcoded ones
let idCount: number = quotes.length + 1;

export const getQuotes = (count: number): Quote[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Quote = quotes[Math.floor(Math.random() * quotes.length)];

    const custom: Quote = {
      ...random,
      id: `G${idCount++}`,
    };

    return custom;
  });

export const getAuthors = (count: number): Column[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Column = columns[Math.floor(Math.random() * columns.length)];

    const custom: Column = {
      ...random,
      id: `author-${idCount++}`,
    };

    return custom;
  });

const getByAuthor = (author: Column, items: Quote[]): Quote[] =>
  items.filter((quote: Quote) => quote.author === author);

export const authorQuoteMap: QuoteMap = columns.reduce(
  (previous: QuoteMap, author: Column) => ({
    ...previous,
    [author.name]: getByAuthor(author, quotes),
  }),
  {}
);

export const generateQuoteMap = (quoteCount: number): QuoteMap =>
  columns.reduce(
    (previous: QuoteMap, author: Column) => ({
      ...previous,
      [author.name]: getQuotes(quoteCount / columns.length),
    }),
    {}
  );
