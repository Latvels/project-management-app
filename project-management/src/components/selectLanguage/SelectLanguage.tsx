import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowDimensions } from '../../services/service';
import { Box, FormControl, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../../store/store';
import { RootState } from '../../store/reducer/reducer';
import { setLang } from '../../store/action/appStateAction';
import './selectLanguage.scss';

function SelectLanguage() {
  const appState = useSelector((state: RootState) => state.appState);
  const appDispatch = useDispatch<AppDispatch>();
  const lang = appState.lang;

  const { i18n } = useTranslation();
  const { width } = useWindowDimensions();

  const handleChange = () => {
    i18n.changeLanguage(lang === 'en' ? 'ru' : 'en');
    appDispatch(setLang(lang === 'en' ? 'ru' : 'en'));
  };

  return (
    <Box>
      <FormControl size="small" sx={{
        width: () => (width > 660 ? '100px' : '90px'),
      }}>
        <Button variant="outlined" sx={{color: 'white', mr: 1}} onClick={() => {
          handleChange();
        }}>{lang}</Button>
      </FormControl>
    </Box>
  );
}

export default SelectLanguage;