import {
  IconButton,
  Menu,
  MenuItem,
  ClickAwayListener,
  Popper,
  Grow,
  MenuList,
  Paper,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setIsCreateNewBoardModalOpen,
  setIsEditProfileModalOpen,
} from '../../store/action/appStateAction';
import { useTranslation } from 'react-i18next';
import './myMenu.scss';

function MyMenu() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const appDispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const onMainPageBtnClick = useCallback(
    (event: Event | React.SyntheticEvent) => {
      handleClose(event);
      navigate(`/mainPage${search}`);
    },
    [search]
  );

  const handleClickOnCreateNewBoardButton = (event: Event | React.SyntheticEvent) => {
    handleClose(event);
    appDispatch(setIsCreateNewBoardModalOpen(true));
  };

  const handleClickOnEditProfileButton = (event: Event | React.SyntheticEvent) => {
    handleClose(event);
    appDispatch(setIsEditProfileModalOpen(true));
  };
  return (
    <div>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 101 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={onMainPageBtnClick}>{t('header:menuItem1')}</MenuItem>
                  <MenuItem onClick={handleClickOnEditProfileButton}>
                    {t('header:menuItem2')}
                  </MenuItem>
                  <MenuItem onClick={handleClickOnCreateNewBoardButton}>
                    {t('header:menuItem3')}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default MyMenu;
