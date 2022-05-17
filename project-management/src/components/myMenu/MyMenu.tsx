import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import './myMenu.scss';
import { useDispatch } from 'react-redux';
import { setIsCreateNewBoardModalOpen, setIsEditProfileModalOpen } from '../../store/action/appStateAction';
import { useTranslation } from 'react-i18next';

function MyMenu() {
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const appDispatch = useDispatch();
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnCreateNewBoardButton = () => {
    handleClose();
    appDispatch(setIsCreateNewBoardModalOpen(true));
  }

  const handleClickOnEditProfileButton = () => {
    handleClose();
    appDispatch(setIsEditProfileModalOpen(true));
  }
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <NavLink to="/mainPage" className="menu__navLink">
          <MenuItem onClick={handleClose}>{t('header:menuItem1')}</MenuItem>
        </NavLink>
        <MenuItem onClick={handleClickOnEditProfileButton}>{t('header:menuItem2')}</MenuItem>
        <MenuItem onClick={handleClickOnCreateNewBoardButton}>{t('header:menuItem3')}</MenuItem>
      </Menu>
    </div>
  );
}

export default MyMenu;
