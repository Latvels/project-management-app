import React, { useEffect, useRef } from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { SelectLanguage, MyMenu } from '../compunents';
import './header.scss';

function Header() {
  const headerRef: React.RefObject<HTMLElement> | null = useRef(null);

  useEffect(() => {
    checkScroll() ? addSticky() : delSticky();
  });

  const checkScroll = (): boolean => {
    return document.body.offsetHeight > window.innerHeight;
  };

  const addSticky = () => {
    headerRef.current?.classList.add('header--sticky');
    document.body.style.marginTop = `${headerRef.current?.offsetHeight}px`;
  };

  const delSticky = () => {
    headerRef.current?.classList.remove('header--sticky');
    document.body.style.marginTop = '0px';
  };
  
  return (
    <Box ref={headerRef} sx={{ flexGrow: 1, width: '100%', top: 0 }} className="header">
      <AppBar position="static" className="header__appBar">
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
  );
}

export default Header;
