
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';


function BoardPage() {
  const { t } = useTranslation();

  const onAddColumn = () => {
    console.log('Колонка добавлена');
  };

  const onAddRow = () => {
    console.log('Строчка добавлена');
  };

  return (
    <Box sx={{ maxHeight: '100wh' }}>
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
          padding: '1rem 1rem 5rem 1rem',
          rowGap: '1rem',
          columnGap: '1rem',
        }}
      >
        {/* ТУТ ПЕРЕДАЮ КОМПОНЕНТ С БОРДАМИ */}
        {/* <Board /> */}
      </Box>
    </Box>
  );
}

export default BoardPage;
