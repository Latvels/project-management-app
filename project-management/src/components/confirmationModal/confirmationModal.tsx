import react, { useEffect } from 'react';
import {Backdrop, Box, Modal, Fade, Typography} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { useTranslation } from 'react-i18next';
import { TIMEOUT_FOR_MODAL } from '../../constants/constant';
import { Button } from '@mui/material';
import React from 'react';
import './confirmationModal.scss';
import {
  setDeletedItem,
  setIsConfirmModalOpen,
  setIsPreloaderOpen,
} from '../../store/action/appStateAction';
import { AppDispatch } from '../../store/store';
import { deleteUser, selectUser } from '../../api/userApi';
import { boardSlise, deleteBoard, selectBoard } from '../../api/boardApi';
import { deleteTask } from '../../api/taskApi';
import { authSlise } from '../../api/authApi';
import { ACTION_STATUSES, Error } from '../../typings/typings';
import { useNavigate } from 'react-router-dom';
import { BasicAlerts } from '../compunents';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ConfirmationModal() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const appState = useSelector((state: RootState) => state.appState);
  const getUserId = useSelector((state: RootState) => state.awtUser);
  const boardRequestStatus = useSelector((state: RootState) => state.board.boardRequestStatus);
  const boardRequestError: Error = useSelector((state: RootState) => state.board.error);
  const {resetBoardRequestStatus} = boardSlise.actions;
  const appDispatch = useDispatch<AppDispatch>();
  const userErrorMessage = useSelector((state: RootState) => state.user.error) as Error;
  const { resetStatuses } = authSlise.actions;
  const boards = useSelector((state: RootState) => state.board);

  const handleClose = () => appDispatch(setIsConfirmModalOpen(false));

  const title = t('confirmationModal:title');
  const commonText = t('confirmationModal:commonText');
  const deleteUserText = t('confirmationModal:deleteUserText');
  const deleteTaskText = t('confirmationModal:deleteTaskText');
  const deleteBoardText = t('confirmationModal:deleteBoardText');
  const buttonYesText = t('confirmationModal:buttonYes');
  const buttonNoText = t('confirmationModal:buttonNo');
  const deletedItem = appState.deletedItem as 'user' | 'board' | 'task';

  const getConfirmationText = (): string => {
    switch (deletedItem) {
      case 'user':
        return `${commonText} ${deleteUserText}?`;
        break;
      case 'board':
        return `${commonText} ${deleteBoardText}?`;
        break;
      case 'task':
        return `${commonText} ${deleteTaskText}?`;
    }
  };

  const logOut = () => {
    appDispatch(resetStatuses())
    navigate('/');
  }

  const handleYesClick = async () => {
    if (deletedItem === 'user') {
      appDispatch(setIsPreloaderOpen(true));
      await appDispatch(deleteUser(String(appState.deletedId)));
      appDispatch(setIsPreloaderOpen(false));
      logOut();
      // if (requestStatus === ACTION_STATUSES.FULFILLED) {
      //   appDispatch(setIsCreateNewBoardModalOpen(false));
      //   appDispatch(resetBoardRequestStatus());
      // }
    } else if (deletedItem === 'board') {
      appDispatch(setIsPreloaderOpen(true));
      const resp = await appDispatch(deleteBoard(String(appState.deletedId)));
      console.log(resp);
      appDispatch(setIsPreloaderOpen(false));
      if (resp.meta.requestStatus === 'fulfilled') {
        appDispatch(resetBoardRequestStatus());
        appDispatch(setIsConfirmModalOpen(false));
      }
// } else if (deletedItem === 'task') {
  //   appDispatch(setIsPreloaderOpen(true));
  //   await appDispatch(deleteTask());
  //  appDispatch(setIsPreloaderOpen(false));
    }
    // appDispatch(setDeletedItem(null));
  };

  const handleNoClick = () => {
    appDispatch(setDeletedItem(null));
    appDispatch(setIsConfirmModalOpen(false));
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={appState.isConfirmModalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: TIMEOUT_FOR_MODAL,
      }}
    >
      <Fade in={appState.isConfirmModalOpen}>
        <Box sx={style}>
          <Box component="div" className="modal__title" sx={{ mb: 2 }}>
            <WarningAmberOutlinedIcon color="warning" sx={{ mr: 2 }}></WarningAmberOutlinedIcon>
            <Typography id="transition-modal-title" variant="h6" component="h4" color="warning">
              {title}
            </Typography>
          </Box>
          <Box component="div" className="modal__text-wrapper" sx={{ mb: 2 }}>
            <Typography id="transition-modal-title" variant="h6" component="h6">
              <p>{getConfirmationText()}</p>
            </Typography>
          </Box>
          <Box component="div" className="modal__buttons" sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              color="warning"
              disabled={false}
              onClick={handleYesClick}
              type="button"
              className="modal__button"
            >
              {buttonYesText}
            </Button>
            <Button
              variant="outlined"
              color="warning"
              disabled={false}
              onClick={handleNoClick}
              type="button"
              className="modal__button"
            >
              {buttonNoText}
            </Button>
          </Box>
          {boardRequestStatus === ACTION_STATUSES.REJECTED && <BasicAlerts error={boardRequestError} />}
        </Box>
      </Fade>
    </Modal>
  );
}

export default ConfirmationModal;
