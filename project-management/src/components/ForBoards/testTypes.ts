import { DraggableId, DraggableLocation } from 'react-beautiful-dnd';

export type Id = string;

export type Column = {
  id: Id;
  name: string;
};

export type Quote = {
  id: Id;
  content: string;
  order: Column;
};

export type Dragging = {
  id: DraggableId;
  location: DraggableLocation;
};

export type QuoteMap = {
  [key: string]: Quote[];
};

export type Task = {
  id: Id;
  content: string;
};
