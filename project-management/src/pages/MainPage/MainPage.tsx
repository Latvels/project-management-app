import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import react, { useEffect } from 'react';
import { Box, Typography, Paper, IconButton, InputBase, Button } from '@mui/material';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import { ACTION_STATUSES, Board } from '../../typings/typings';
import SearchIcon from '@mui/icons-material/Search';
import { BasicAlerts, BoardCard } from '../../components/compunents';
import { boardSlise, getBoards } from '../../api/boardApi';
import { setIsPreloaderOpen } from '../../store/action/appStateAction';

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
  const appDispatch = useDispatch<AppDispatch>();
  const allBoards = useSelector((state: RootState) => state.board.entities) || [];
  const { setBoards, resetBoardRequestStatus } = boardSlise.actions;
  const boardRequestError = useSelector((state: RootState) => state.board.error) as Error;
  const boardRequestStatus = useSelector((state: RootState) => state.board.boardRequestStatus);
  const [searchValue, setSearchValue] = useState('');

  const { t } = useTranslation();
  const searchInputPlaceholder = t('mainPage:searchInputPlaceholder');
  const resetSearchBtn = t('mainPage:resetSearchBtn');

  const getAllBoards = async () => {
    appDispatch(setIsPreloaderOpen(true));
    const resp = await appDispatch(getBoards());
    appDispatch(setIsPreloaderOpen(false));
    if (resp.meta.requestStatus === 'fulfilled') {
      appDispatch(resetBoardRequestStatus());
    }
  };

  useEffect(() => {
    getAllBoards();
  }, [appDispatch]);

  const filterByKey = () => {
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

  const filterBoards = () => {
    if (searchValue !== '') {
      const filteredBoards = filterByKey();
      appDispatch(setBoards(filteredBoards));
    }
  };

  const handleSearchButtonClick = () => {
    filterBoards();
    setSearchValue('');
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: react.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      handleSearchButtonClick();
      setSearchValue('');
    }
  };

  const handleClickResetButton = async () => {
    setSearchValue('');
    await getAllBoards();
  };

  return (
    <>
      {boardRequestStatus === ACTION_STATUSES.REJECTED ? (
        <BasicAlerts error={boardRequestError} />
      ) : (
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
                onKeyDown={handleKeyDown}
                value={searchValue}
                onChange={handleSearchChange}
              />
              <IconButton sx={{ p: '10px' }} aria-label="search" onClick={handleSearchButtonClick}>
                <SearchIcon color="info" />
              </IconButton>
            </Paper>
            <Button
              sx={{ mr: 1 }}
              variant="outlined"
              disabled={false}
              onClick={handleClickResetButton}
            >
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
            {allBoards.length !== 0 ? (
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
      )}
    </>
  );
}

export default MainPage;
