import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowDimensions } from '../../services/service';
import { Box, FormControl, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../../store/store';
import { RootState } from '../../store/reducer/reducer';
import { setLang } from '../../store/action/appStateAction';
import i18n from '../../services/i18n';
import './selectLanguage.scss';

function SelectLanguage() {
  const appDispatch = useDispatch<AppDispatch>();

  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { width } = useWindowDimensions();

  const getLang = () => {
    return lang === 'ru-RU' || lang === 'ru' ? 'ru' : 'en';
  };

  const handleChange = () => {
    i18n.changeLanguage(lang === 'en' ? 'ru' : 'en');
    appDispatch(setLang(lang === 'en' ? 'ru' : 'en'));
  };

  return (
    <Box>
      <FormControl
        size="small"
        sx={{
          width: () => (width > 660 ? '100px' : '90px'),
        }}
      >
        <Button
          variant="outlined"
          sx={{ color: 'white', mr: 1 }}
          onClick={() => {
            handleChange();
          }}
        >
          {getLang()}
        </Button>
      </FormControl>
    </Box>
  );
}

export default SelectLanguage;
