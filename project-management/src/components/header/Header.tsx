import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import MyMenu from '../myMenu/MyMenu';
import SelectLanguage from '../selectLanguage/SelectLanguage';

function Header() {
  return (
    <>
      <Box sx={{ flexGrow: 1, width: '100%', top: 0 }}>
        <AppBar position="static">
          <Toolbar>
            <MyMenu />
            <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
              RS-Drive
            </Typography>
            <SelectLanguage />
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>

  );
};

export default Header;
