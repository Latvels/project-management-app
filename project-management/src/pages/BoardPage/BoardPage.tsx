import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Board from '../../components/ForBoards/Board';
import { authorQuoteMap } from '../../components/ForBoards/testData';

function BoardPage() {
  const { t } = useTranslation();

  const onAddColumn = () => {
    console.log('Колонка добавлена');
  };

  const onAddRow = () => {
    console.log('Строчка добавлена');
  };
  console.log('authorQuoteMap', authorQuoteMap);
  return (
    <Box sx={{  }}>
      <Box sx={{ display: 'flex', margin: '0.5rem 0 0 0.5rem' }}>
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
        }}
      >
        {/* ТУТ ПЕРЕДАЮ КОМПОНЕНТ С БОРДАМИ */}
        <Board initial={authorQuoteMap} isCombineEnabled />
      </Box>
    </Box>
  );
}

export default BoardPage;
