import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import react, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, IconButton, InputBase, Button } from '@mui/material';
import store, { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import { Board } from '../../typings/typings';
import SearchIcon from '@mui/icons-material/Search';
import { BoardCard } from '../../components/compunents';
import { boardSlise, getBoards } from '../../api/boardApi';
const CardsIsEmpty = () => {
  const { t } = useTranslation();
  const message = t('mainPage:cardsIsEmpty');
  return (
    <Typography variant="h6" component="p" sx={{ color: '#ed6c02', textTransform: 'uppercase' }}>
      {message}
    </Typography>
  );
};
function MainPage() {
  const { t } = useTranslation();
  const message = t('mainPage:cardsIsEmpty');
  const appDispatch = useDispatch<AppDispatch>();
  const allBoards = useSelector((state: RootState) => state.board.entities) || [];
  const { setBoards } = boardSlise.actions;
  const searchInputPlaceholder = t('mainPage:searchInputPlaceholder');
  const resetSearchBtn = t('mainPage:resetSearchBtn');
  const searchInputRef: react.RefObject<HTMLFormElement> | null = useRef(null);

  const getAllBoards = async () => {
    await appDispatch(getBoards());
  };

  useEffect(() => {
    getAllBoards();
  }, [appDispatch]);

  const filterByKey = (searchValue: string) => {
    const res: Board[] = [];
    allBoards.map((el: Board) => {
      const keys = Object.keys(el) as Array<keyof Board>;
      keys.map((key) => {
        if (key === 'title' || key === 'description') {
          if (el[key]?.includes(searchValue) && !res.find((item) => item.id === el.id)) {
            res.push(el);
          }
        }
      });
    });
    return res;
  };

  const filterBoards = (value: string | null) => {
    if (value) {
      const filteredBoards = filterByKey(value);
      appDispatch(setBoards(filteredBoards));
    }
  };

  const handleSearchButtonClick = () => {
    const input = searchInputRef.current!.querySelector('input') as HTMLInputElement;
    const value = input.value;
    filterBoards(value);
    input.value = '';
  };

  const handleKeyDown = (e: react.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      handleSearchButtonClick();
      const el = e.target as HTMLInputElement;
      el.value = '';
    }
  };

  const handleClickResetButton = async () => {
    const input = searchInputRef.current!.querySelector('input') as HTMLInputElement;
    input.value = '';
    await getAllBoards();
  };
  return (
    <>
      <Box
        component="div"
        sx={{
          p: '2px 4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 650,
          margin: '50px auto 20px',
          color: 'blue',
        }}
      >
        <Paper component="form" sx={{ ml: 1, mr: 1 }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={searchInputPlaceholder}
            inputProps={{ 'aria-label': 'search' }}
            color="info"
            ref={searchInputRef}
            onKeyDown={handleKeyDown}
          />
          <IconButton sx={{ p: '10px' }} aria-label="search" onClick={handleSearchButtonClick}>
            <SearchIcon color="info" />
          </IconButton>
        </Paper>
        <Button sx={{ mr: 1 }} variant="outlined" disabled={false} onClick={handleClickResetButton}>
          {resetSearchBtn}
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '1rem 1rem 5rem 1rem',
          justifyContent: 'center',
          rowGap: '1rem',
          columnGap: '1rem',
        }}
      >
        {allBoards && allBoards.length !== 0 ? (
          allBoards.map((el: Board) => {
            return (
              <BoardCard key={el.id} id={el.id} title={el.title} description={el.description} />
            );
          })
        ) : (
          <CardsIsEmpty />
        )}
      </Box>
    </>
  );
}

export default MainPage;
