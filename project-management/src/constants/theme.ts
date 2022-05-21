import { createTheme } from '@mui/material/styles';

// A custom theme for this app
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
    },
  },
  typography: {
    htmlFontSize: 14,
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
});

export default theme;
