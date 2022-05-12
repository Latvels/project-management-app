import React from 'react';
import './App.css';
import MainRoutes from '../../routes/routes';
// import { useTranslation, Trans } from 'react-i18next';
// import {availableLanguages} from '../../services/i18n';
import Header from '../header/Header';
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffff8b',
      main: '#ffee58',
      dark: '#c9bc1f',
      contrastText: '#000000',
    }
  },
  typography: {
    htmlFontSize: 14,
    // fontFamily: '',
  }
});

export default function App() {
  // const { t, i18n  } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <select defaultValue={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
            {availableLanguages.map((language) => (
              <option key={language}>{language}</option>
              ))}
          </select>
        <p>
          <Trans i18nKey="description:part1"></Trans>
        </p>
        <p>{t('description:part2')}</p> */}
        <Header></Header>
        <MainRoutes />
      </div>
    </ThemeProvider>
  );
};