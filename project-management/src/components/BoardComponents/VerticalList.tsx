/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Box, Button } from '@mui/material';

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-vertical-${k}`,
    content: `item  vertical ${k}`,
  }));

export const VerticalList = (props: any) => {
  // new start
  const [state, setState] = useState({
    items: getItems(6),
  });
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnd = (result: DropResult) => {
    setIsDragging(false);
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const reorder = (list: any, startIndex: any, endIndex: any) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };
    const items: any = reorder(state.items, result.source.index, result.destination.index);

    setState({
      items,
    });
  };

  const onDragStart = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId={`${props.id}-Vertical-droppable`} type="ISSUE" direction="vertical">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {state.items.map((item, index) => (
              <Draggable
                key={`${props.id}-vertical-drag-${item.id}`}
                draggableId={`${props.id}-vertical-drag-${item.id}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
