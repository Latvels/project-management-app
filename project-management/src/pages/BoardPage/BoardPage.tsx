
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
import { setIsCreateColumnModalOpen, setIsCreateTaskModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { boardSlise, getBoardsById } from '../../api/boardApi';
import Board from '../../components/ForBoards/Board';
import { authorQuoteMap } from '../../components/ForBoards/testData';
import MockBoard from '../../components/MockBoard/MockBoard';

function BoardPage() {
  const appDispatch = useDispatch<AppDispatch>();
  const appState = useSelector((state: RootState) => state.appState);
  const boardRequestError = useSelector((state: RootState) => state.board.error) as Error;
  const boardRequestStatus = useSelector((state: RootState) => state.board.boardRequestStatus);
  const boardState = useSelector((state: RootState) => state.board);
  const {setBoard, resetBoardRequestStatus} = boardSlise.actions;
  const { t } = useTranslation();

  const onAddColumn = () => {
    appDispatch(setIsCreateColumnModalOpen(true));
  };

  const onAddRow = () => {
    appDispatch(setIsCreateTaskModalOpen(true));
  };

  const getBoard = async () => {
    appDispatch(setIsPreloaderOpen(true));
    console.log(appState.currentBoardId);
    const resp = await appDispatch(getBoardsById(appState.currentBoardId!));
    console.log(resp);
    appDispatch(setIsPreloaderOpen(false));
    if (resp.meta.requestStatus === 'fulfilled') {
      console.log(resp.payload);
      appDispatch(resetBoardRequestStatus());
    }
  }

  useEffect(() => {
    getBoard();
  }, [appDispatch])

  return (
    <>
      {(boardRequestStatus === ACTION_STATUSES.REJECTED) ? (<BasicAlerts error={boardRequestError} />) : 
      // (<Box sx={{ maxHeight: '100wh', display: 'flex', mt: 1 }}>
      (<Box sx={{ minHeight: '100wh',display: 'flex', flexDirection: 'column', columnGap: 1, mt: 1, justifyContent: 'flex-start' }}>
        <Box sx={{ display: 'flex', margin: '0.5rem 0 0 0.5rem' }}>
          <Button sx={{ mr: 1 }} variant="outlined" disabled={false} onClick={onAddColumn}>
            {t('boardPage:addColumn')}
          </Button>
          <Button sx={{ mr: 1 }} variant="outlined" disabled={false} onClick={onAddRow}>
            {t('boardPage:addRow')}
          </Button>
        </Box>
        {/* В ЧИСТОВОМ ВАРИАНТЕ, ЕСЛИ УБИРАЕМ MOCKBOARD - ИСПОЛЬЗУЕМ СТИЛИ НИЖЕ. ЗАКОММЕНТИЛА ДЛЯ КОРРЕКТНОГО ОТРАЖЕНИЯ PREWIEV */}
        {/* <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            height: '500px'
          }} */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            height: '400px'
          }}
        >
          <Board initial={authorQuoteMap} isCombineEnabled />
        </Box>
        <MockBoard board={boardState.currentBoard!}></MockBoard>
      </Box>)}
    </>
    // тут был конфликт
    // <Box sx={{  }}>
    //   <Box sx={{ display: 'flex', margin: '0.5rem 0 0 0.5rem' }}>
    //     <Button sx={{ mr: 1 }} variant="outlined" disabled={false} onClick={onAddColumn}>
    //       {t('boardPage:addColumn')}
    //     </Button>
    //     <Button sx={{ mr: 1 }} variant="outlined" disabled={false} onClick={onAddRow}>
    //       {t('boardPage:addRow')}
    //     </Button>
    //   </Box>
    //   <Box
    //     sx={{
    //       display: 'flex',
    //       flexWrap: 'wrap',
    //     }}
    //   >
    //     {/* ТУТ ПЕРЕДАЮ КОМПОНЕНТ С БОРДАМИ */}
    //     <Board initial={authorQuoteMap} isCombineEnabled />
    //   </Box>
    // </Box>
  );
}

export default BoardPage;
