/* eslint-disable @typescript-eslint/no-explicit-any */
import react, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BoardCard } from '../../components/compunents';
import { getBoards } from '../../api/boardApi'
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import { Board } from '../../typings/typings';

const CardsIsEmpty = () => {
  const { t } = useTranslation();
  const message = t('mainPage:cardsIsEmpty');
  console.log('message')
  return <Typography color='warning' variant="h6" component="p">{message}</Typography>;
};


function MainPage() {
  const appDispatch = useDispatch<AppDispatch>();
  const [ isCardsIsEmptyOpen, setIsCarsIsEmptyOpen ] = useState(false);

  const allBoards = useSelector((state: RootState) => state.board.entities) as Board[];

  const getAllBoards = async () => {
    const boards = await appDispatch(getBoards());
    if (!boards.payload) {
      setIsCarsIsEmptyOpen(true);
    }
  }

  useEffect(() => {
    getAllBoards();
  }, [appDispatch]);

  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      padding: '1rem 1rem 5rem 1rem',
      justifyContent: 'center',
      rowGap: '1rem',
      columnGap: '1rem',
    }}>
      {allBoards.length && allBoards.map((el: Board) => {
        return (<BoardCard key={el.id} id={el.id} title={el.title} description={el.description}/>)
      })}
    {isCardsIsEmptyOpen && <CardsIsEmpty />}
    </Box>
  );
}

export default MainPage;
