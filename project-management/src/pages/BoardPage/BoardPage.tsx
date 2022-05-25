/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';
// import { Box, Button } from '@mui/material';
// import { DragDropContext } from 'react-beautiful-dnd';
// import { BoardColumn, BoardItem} from '../../components/compunents';

import React, { useState } from 'react'
import { BoardColumn } from '../../components/compunents'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

function BoardPage () {
  const { t } = useTranslation();
  
  const onAddColumn = () => {
    console.log('Колонка добавлена')
  };

  const onAddRow = () => {
    console.log('Строчка добавлена')
  };

  const initialColumns = {
    todo: {
      id: 'todo',
      list: ['item 1', 'item 2', 'item 3']
    },
    doing: {
      id: 'doing',
      list: []
    },
    done: {
      id: 'done',
      list: []
    }
  }
  const [columns, setColumns] = useState(initialColumns)

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null

    // Set start and end variables
    // @ts-ignore 
    const start = columns[source.droppableId]
    // @ts-ignore 
    const end = columns[destination.droppableId]

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      )

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index])

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList
      }

      // Update the state
      setColumns(state => ({ ...state, [newCol.id]: newCol }))
      return null
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      )

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList
      }

      // Make a new end list array
      const newEndList = end.list

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index])

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList
      }

      // Update the state
      setColumns(state => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }))
      return null
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          {Object.values(columns).map(col => (
            <BoardColumn col={col} key={col.id} />
          ))}
        </Box>
      </Box>
    </DragDropContext>
  )
}

export default BoardPage;
