import { IconButton, Menu, MenuItem } from '@mui/material';
import React, {useCallback, useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import './myMenu.scss';
import { useDispatch } from 'react-redux';
import {
  setIsCreateNewBoardModalOpen,
  setIsEditProfileModalOpen,
} from '../../store/action/appStateAction';
import { useTranslation } from 'react-i18next';

function MyMenu() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const appDispatch = useDispatch();
  const open = Boolean(anchorEl);
  const { search } = useLocation();
  const navigate = useNavigate();
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMainPageBtnClick = useCallback(() => {
    navigate(`/mainPage${search}`);
    handleClose();
  }, [search]);

  const handleClickOnCreateNewBoardButton = () => {
    handleClose();
    appDispatch(setIsCreateNewBoardModalOpen(true));
  };

  const handleClickOnEditProfileButton = () => {
    handleClose();
    appDispatch(setIsEditProfileModalOpen(true));
  };
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
        <MenuItem onClick={onMainPageBtnClick}>{t('header:menuItem1')}</MenuItem>
        <MenuItem onClick={handleClickOnEditProfileButton}>{t('header:menuItem2')}</MenuItem>
        <MenuItem onClick={handleClickOnCreateNewBoardButton}>{t('header:menuItem3')}</MenuItem>
      </Menu>
    </div>
  );
}

export default MyMenu;
