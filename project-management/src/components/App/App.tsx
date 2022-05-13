import React from 'react';
import './App.css';
import MainRoutes from '../../routes/routes';
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
  }
});

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header></Header>
        <MainRoutes />
      </div>
    </ThemeProvider>
  );
};