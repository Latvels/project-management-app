/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';
import { BoardCard } from '../../components/compunents';
import { getBoards, createBoard,updateBoards, getBoardsById, deleteBoard, selectBoard } from '../../api/boardApi'
import store, { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

function MainPage() {
  const appDispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  //! пример
  // const dataaa = useSelector(getBoards)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allBoards = useSelector((state: any) => state.board.entities);
  // const allBoards = appDispatch(getBoards());
  // console.log('board', allBoards)
  const iiid = 'dfa66578-979d-4a8e-b724-7092e7c94e0a'
  // console.log('store',  board, loading)

  const testFunc = async () => {
    // await appDispatch(getBoards()) // получаю все записи 
    // await appDispatch(getBoardsById(iiid)) // получаю запись 
    // await appDispatch(updateBoards(bdat)) // обновление
    // await appDispatch(deleteBoard(iiid)) // удаление
    // await appDispatch(createBoard(bdat)) // создание
  }
  React.useEffect(() => {
    appDispatch(getBoards());
    testFunc();
  }, [appDispatch])
 // ! конец примера
  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      padding: '1rem 1rem 5rem 1rem',
      justifyContent: 'space-between',
    }}>
      {allBoards && allBoards.map((el:{ id: string, title: string, description: string}) => {
        return (<BoardCard key={el.id} id={el.id} title={el.title} description={el.description}/>)
      })}
    </Box>
  );
}

export default MainPage;
