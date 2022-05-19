import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { SelectLanguage, MyMenu } from '../compunents';
import './header.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { authSlise } from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { ACTION_STATUSES } from '../../typings/typings';

function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const headerRef: React.RefObject<HTMLElement> | null = useRef(null);
  const navigate = useNavigate();
  const requestStatus = useAppSelector((state) => state.auth.signInStatus);
  const { resetStatuses } = authSlise.actions;

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

  const logOut = useCallback(() => {
    console.log(requestStatus);
    if (requestStatus === ACTION_STATUSES.FULFILLED) {
      dispatch(resetStatuses());
      navigate('/');
    }
  }, [requestStatus]);

  return (
    <Box
      ref={headerRef}
      sx={{ flexGrow: 1, width: '100%', top: 0 }}
      className="header"
      component="div"
    >
      <AppBar position="static" className="header__appBar">
        <Toolbar>
          <MyMenu />
          <Typography
            variant="h6"
            component="span"
            sx={{ flexGrow: 1, fontWeight: 500, textAlign: 'center' }}
          >
            RS-Drive
          </Typography>
          <SelectLanguage />
          <Button onClick={logOut} color="inherit">
            {t('header:Logout')}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
