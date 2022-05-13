import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import {availableLanguages} from '../../services/i18n';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import './selectLanguage.scss';

function SelectLanguage() {
  const { i18n  } = useTranslation();

  return (
  <Box sx={{ mr: 2 }}>
    <IconButton
      id="basic-button"
      color='inherit'
      className="selectLanguage__icon"
    >
      <LanguageIcon />
    </IconButton>

    <select defaultValue={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)} className="selectLanguage__select">
      {availableLanguages.map((language) => {
        return <option key={language}>
          {language}
        </option>
        })}
    </select>
  </Box>
);
}

export default SelectLanguage;