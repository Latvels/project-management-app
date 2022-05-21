import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useWindowDimensions } from '../../services/service';
import { Box, InputLabel, MenuItem, FormControl, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import './selectLanguage.scss';

function SelectLanguage() {
  const { i18n, t } = useTranslation();

  const [lang, setLang] = React.useState(localStorage.getItem('lang') || 'en');

  const handleChange = () => {
    i18n.changeLanguage(lang === 'en' ? 'ru' : 'en');
    setLang(lang === 'en' ? 'ru' : 'en');
    localStorage.setItem('lang', lang === 'en' ? 'ru' : 'en');
    window.location.reload();
  };
  const { width } = useWindowDimensions();

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
          onClick={() => {
            handleChange();
          }}
          sx={{
            color: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.primary.contrastText
                : theme.palette.secondary.contrastText,
          }}
        >
          {lang}
        </Button>
      </FormControl>
    </Box>
  );
}

export default SelectLanguage;
