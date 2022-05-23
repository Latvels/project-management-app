import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { SelectLanguage, MyMenu } from '../compunents';
import './header.scss';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { RootState } from '../../store/reducer/reducer';
import { useSelector } from 'react-redux';
import { Root } from 'react-dom/client';

function Header() {
  const appDispatch = useDispatch<AppDispatch>();
  const appState = useSelector((state: RootState) => state.appState);
  const {t} = useTranslation();
  const headerRef: React.RefObject<HTMLElement> | null = useRef(null);

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

  const onResize = () => {
    checkScroll() ? addSticky() : delSticky();
  }

  useLayoutEffect(() => {
    delSticky();
    window.addEventListener('scroll', onResize);
    return () => {
      window.removeEventListener('scroll', onResize);
    }
  });

  useLayoutEffect(() => {
    delSticky();
  }, [appState]);

  return (
    <Box ref={headerRef} sx={{ flexGrow: 1, width: '100%', top: 0, zIndex: 100 }} className="header" component="div">
      <AppBar position="static" className="header__appBar">
        <Toolbar>
          <MyMenu />
          <Typography variant="h6" component="span" sx={{ flexGrow: 1, fontWeight: 500, textAlign: 'center' }}>
            RS-Drive
          </Typography>
          <SelectLanguage />
          <Button color="inherit">{t('header:Logout')}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
