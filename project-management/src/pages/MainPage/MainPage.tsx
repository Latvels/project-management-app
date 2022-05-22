/* eslint-disable @typescript-eslint/no-explicit-any */
import react, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Paper, IconButton, InputBase } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BoardCard } from '../../components/compunents';
import { boardSlise, getBoards } from '../../api/boardApi'
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import { Board } from '../../typings/typings';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';


const CardsIsEmpty = () => {
  const { t } = useTranslation();
  const message = t('mainPage:cardsIsEmpty');
  console.log('message')
  return <Typography variant="h6" component="p" sx={{color: '#ed6c02', textTransform: 'uppercase'}}>{message}</Typography>;
};


function MainPage() {
  const appDispatch = useDispatch<AppDispatch>();
  // const [ isCardsIsEmptyOpen, setIsCarsIsEmptyOpen ] = useState(false);
  const allBoards = useSelector((state: RootState) => state.board.entities);
  const { setBoards } = boardSlise.actions;
  const {t} = useTranslation();
  const searchInputPlaceholder = t('mainPage:searchInputPlaceholder');

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
          if (el[key]?.includes(searchValue) && !res.find(item => item.id === el.id)) {
            res.push(el);
          }
        }
      })
    })
    return res;
  }

  const filterBoards = (value: string | null) => {
    if (value) {
      const filteredBoards = filterByKey(value);
      appDispatch(setBoards(filteredBoards));
    }
  }

  const handleSearchButtonClick = () => {
    const input = searchInputRef.current!.querySelector('input') as HTMLInputElement;
    const value = input.value;
    filterBoards(value);
    input.value = '';
  }

  const handleFocusOnInput = async () => {
    await getAllBoards();
  }

  const handleKeyDown = (e: react.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      handleSearchButtonClick();
      const el = e.target as HTMLInputElement;
      el.blur();
    }
  }

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: '50px auto 20px', color: 'blue'
      }}
      >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={searchInputPlaceholder}
        inputProps={{ 'aria-label': 'search' }}
        color='info'
        ref={searchInputRef}
        onFocus={handleFocusOnInput}
        onKeyDown={handleKeyDown}
      />
      <IconButton sx={{ p: '10px' }} aria-label="search" onClick={handleSearchButtonClick}>
        <SearchIcon color='info'/>
      </IconButton>
      </Paper>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '1rem 1rem 5rem 1rem',
        justifyContent: 'center',
        rowGap: '1rem',
        columnGap: '1rem',
      }}>
        { allBoards && allBoards.length !== 0 ? allBoards.map((el: Board) => {
          return (<BoardCard key={el.id} id={el.id} title={el.title} description={el.description}/>)
        }) : <CardsIsEmpty />}
      </Box>
    </>
  );
}

export default MainPage;
