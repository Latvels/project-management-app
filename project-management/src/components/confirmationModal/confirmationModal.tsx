import react from 'react';
import {Backdrop, Box, Modal, Fade, Typography} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { useTranslation } from 'react-i18next';
import { TIMEOUT_FOR_MODAL } from '../../constants/constant';
import { Button } from '@mui/material';
import React from 'react';
import './confirmationModal.scss';
import { useNavigate } from 'react-router-dom';
import { setDeletedItem, setIsConfirmModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { AppDispatch } from '../../store/store';
import { deleteUser } from '../../api/userApi';
import { deleteBoard } from '../../api/boardApi';
import { deleteTask } from '../../api/taskApi';

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
  const appDispatch = useDispatch<AppDispatch>();

  const handleClose = () => appDispatch(setIsConfirmModalOpen(false));

  const title = t('confirmationModal:title');
  const commonText=t('confirmationModal:commonText');
  const deleteUserText=t('confirmationModal:deleteUserText');
  const deleteTaskText=t('confirmationModal:deleteTaskText');
  const deleteBoardText=t('confirmationModal:deleteBoardText');
  const buttonYesText=t('confirmationModal:buttonYes');
  const buttonNoText=t('confirmationModal:buttonNo');
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
  }

  const handleYesClick = async () => {
    appDispatch(setIsConfirmModalOpen(false));
    appDispatch(setIsPreloaderOpen(true));
    if (deletedItem === 'user') {
      await appDispatch(deleteUser(String(appState.deletedId)));
      navigate('/');
    } else if (deletedItem === 'board') {
      await appDispatch(deleteBoard(String(appState.deletedId)));
      window.location.reload();
    // } else if (deletedItem === 'task') {
    //   await appDispatch(deleteTask());
    }
    appDispatch(setDeletedItem(null));
    appDispatch(setIsPreloaderOpen(false));
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
      <Fade in={appState.isConfirmModalOpen} >
        <Box sx={style}>
          <Box component='div' className="modal__title" sx={{mb: 2}}>
            <WarningAmberOutlinedIcon color='warning' sx={{mr: 2}}></WarningAmberOutlinedIcon>
            <Typography id="transition-modal-title" variant="h6" component="h4" color="warning">
              {title}
            </Typography>
          </Box>
          <Box component='div' className="modal__text-wrapper" sx={{mb: 2}}>
            <Typography id="transition-modal-title" variant="h6" component="h6">
              <p>{getConfirmationText()}</p>
            </Typography>
          </Box>
          <Box component='div' className="modal__buttons" sx={{mb: 2}}>
            <Button
              variant="outlined"
              color="warning"
              disabled={false}
              onClick={handleYesClick}
              type="button"
              className="modal__button">
                {buttonYesText}
            </Button>
            <Button
              variant="outlined"
              color="warning"
              disabled={false}
              onClick={handleNoClick}
              type="button"
              className="modal__button">
                {buttonNoText}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ConfirmationModal;