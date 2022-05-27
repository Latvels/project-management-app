
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import { BasicAlerts } from '../../components/compunents';
import { ACTION_STATUSES } from '../../typings/typings';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setIsPreloaderOpen } from '../../store/action/appStateAction';
import { boardSlise, getBoardsById } from '../../api/boardApi';

function BoardPage() {
  const appDispatch = useDispatch<AppDispatch>();
  const appState = useSelector((state: RootState) => state.appState);
  const boardRequestError = useSelector((state: RootState) => state.board.error) as Error;
  const boardRequestStatus = useSelector((state: RootState) => state.board.boardRequestStatus);
  const { t } = useTranslation();

  const onAddColumn = () => {
    console.log('Колонка добавлена');
  };

  const onAddRow = () => {
    console.log('Строчка добавлена');
  };

  const getBoard = async () => {
    appDispatch(setIsPreloaderOpen(true));
    await appDispatch(getBoardsById(appState.currentBoardId!));
    appDispatch(setIsPreloaderOpen(false));
  }

  useEffect(() => {
    getBoard();
  }, [appDispatch])

  return (
    <>
      {(boardRequestStatus === ACTION_STATUSES.REJECTED) ? (<BasicAlerts error={boardRequestError} />) : 
      (<Box sx={{ maxHeight: '100wh' }}>
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
      </Box>)}
    </>
  );
}

export default BoardPage;
