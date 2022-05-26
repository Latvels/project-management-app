import React, { useRef, useLayoutEffect, useCallback } from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { SelectLanguage, MyMenu } from '../compunents';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { authSlise } from '../../api/authApi';
import { ACTION_STATUSES } from '../../typings/typings';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../store/store';
import { RootState } from '../../store/reducer/reducer';
import { useSelector } from 'react-redux';
import './header.scss';

function Header() {
  const appState = useSelector((state: RootState) => state.appState);
  const appDispatch = useDispatch<AppDispatch>();
  const [params] = useSearchParams();
  const headerRef: React.RefObject<HTMLElement> | null = useRef(null);
  const navigate = useNavigate();
  const requestStatus = useAppSelector((state) => state.auth.signInStatus);
  const { resetStatuses } = authSlise.actions;
  const { pathname } = useLocation();
  const showMainPageButton =
    params.get('isUserActivated') && params.get('isUserActivated') === 'true';
  const showGoBackBtn = pathname !== '/';
  const { t } = useTranslation();

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
    if (requestStatus === ACTION_STATUSES.FULFILLED) {
      appDispatch(resetStatuses());
      navigate('/');
    }
  }, [requestStatus]);

  const onResize = () => {
    checkScroll() ? addSticky() : delSticky();
  };

  useLayoutEffect(() => {
    delSticky();
    window.addEventListener('scroll', onResize);
    return () => {
      window.removeEventListener('scroll', onResize);
    };
  });

  useLayoutEffect(() => {
    delSticky();
  }, [appState]);

  return (
    <Box
      ref={headerRef}
      sx={{ flexGrow: 1, width: '100%', top: 0, zIndex: 100 }}
      className="header"
      component="div"
    >
      <AppBar position="static" className="header__appBar">
        <Toolbar>
          {showMainPageButton && <MyMenu />}
          {showGoBackBtn && (
            <Button variant="contained" onClick={() => navigate(-1)}>
              {t('header:goBackBtn')}
            </Button>
          )}
          <Typography
            variant="h6"
            component="span"
            sx={{ flexGrow: 1, fontWeight: 500, textAlign: 'center' }}
          >
            RS-Drive
          </Typography>
          <SelectLanguage />
          {showMainPageButton && (
            <Button onClick={logOut} color="inherit">
              {t('header:Logout')}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
