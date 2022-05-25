/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';
// import { Box, Button } from '@mui/material';
// import { DragDropContext } from 'react-beautiful-dnd';
// import { BoardColumn, BoardItem} from '../../components/compunents';

import React, { useState } from 'react'
import { BoardColumn } from '../../components/compunents'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {VerticalList} from '../../components/BoardComponents/VerticalList';

// create fake data
const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `horizontal-item-${k}`,
    content: `horizontal-item ${k}`
  }));

function BoardPage () {
  const { t } = useTranslation();
  
  const onAddColumn = () => {
    console.log('Колонка добавлена')
  };

  const onAddRow = () => {
    console.log('Строчка добавлена')
  };
  
  // new start
  const [state, setState] = useState({
    items: getItems(6)
  });
  const [isDragging, setIsDragging] = useState(false);

  const reorder = (list:any, startIndex:any, endIndex:any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  const onDragEnd = (result: DropResult) => {
    setIsDragging(false);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items:any = reorder(
      state.items,
      result.source.index,
      result.destination.index
    );

    setState({
      items
    });
  };

  const onDragStart = () => {};


  return (
    
      <Box sx={{maxHeight: '100wh'}}>
        <Box sx={{ display: 'flex', margin: '0.5rem 0 0 0.5rem' }} >
          <Button sx={{ mr: 1 }} variant="outlined" disabled={false} onClick={onAddColumn}>
            {t('boardPage:addColumn')}
          </Button>
          <Button sx={{ mr: 1 }} variant="outlined" disabled={false} onClick={onAddRow}>
            {t('boardPage:addRow')}
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '1rem 1rem 5rem 1rem',
            rowGap: '1rem',
            columnGap: '1rem',
          }}>
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            {/* первая итерация, создаем площадку для перетаскивания колонок */}
              <Droppable type="COLUMN" direction="horizontal" droppableId="board">
                {(provided, snapshot) => (
                  <Box
                    sx={{display: 'flex'}}
                    id="parent-scroll-cont"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {state.items.map((item: any, index: number) => (
                      <Draggable
                        key={item.id}
                        draggableId={`${item.id}-horiz`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p className="header">{item.content}</p>
                              <VerticalList id={item.id}/>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </Box>
                )} 
                {/* вторая итерация, создаем перетаскиваемые колонки */}
                
              </Droppable>
          </DragDropContext>
        </Box>
      </Box>
  )
}

export default BoardPage;
