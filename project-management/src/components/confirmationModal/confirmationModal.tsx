import react from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { useTranslation } from 'react-i18next';
import { TIMEOUT_FOR_MODAL } from '../../constants/constant';
import { Button } from '@mui/material';
import React from 'react';
import './confirmationModal.scss';
import { setDeletedItem, setIsConfirmModalOpen, setIsPreloaderOpen } from '../../store/action/appStateAction';
import { AppDispatch } from '../../store/store';
import { deleteUser, selectUser } from '../../api/userApi';
import { deleteBoard, selectBoard } from '../../api/boardApi';
import { deleteTask } from '../../api/taskApi';
import { err } from '../../utils/showBasicAlerts';
import { useNavigate } from 'react-router-dom';
import { authSlise } from '../../api/authApi';
import { Error } from '../../typings/typings';

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
  const appState = useSelector((state: RootState) => state.appState);
  const {entities: user} = useSelector(selectUser);
  const userId = user.id as string;
  const {entities: board} = useSelector(selectBoard);
  const boardId = board.id as string;
  const appDispatch = useDispatch<AppDispatch>();
  const userErrorMessage = useSelector((state: RootState) => state.user.error) as Error;
  const boardErrorMessage = useSelector((state: RootState) => state.board.error) as Error;
  const taskErrorMessage = useSelector((state: RootState) => state.task.error) as Error;
  const navigate = useNavigate();
  const signInStatus = useSelector((state: RootState) => state.auth.signInStatus);
  let errorMessage: Error = {};
  //todo доработать logOut
  // const { resetStatuses } = authSlise.actions;


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

  const logOut = () => {
    console.log('signInStatus', signInStatus);
    // 
    // dispatchEvent(resetStatuses());
    navigate('/');
  }

  const handleYesClick = async () => {
    appDispatch(setIsConfirmModalOpen(false));
    appDispatch(setIsPreloaderOpen(true));
    if (deletedItem === 'user') {
      await appDispatch(deleteUser(userId));
      appDispatch(setIsPreloaderOpen(false));
      logOut();
      userErrorMessage.message === '' ? appDispatch(setIsConfirmModalOpen(false)) : errorMessage = userErrorMessage;
    } else if (deletedItem === 'board') {
      await appDispatch(deleteBoard(boardId));
      appDispatch(setIsPreloaderOpen(false));
      boardErrorMessage.message === '' ? appDispatch(setIsConfirmModalOpen(false)) : errorMessage = userErrorMessage;
  // } else if (deletedItem === 'task') {
  //   await appDispatch(deleteTask());
  //  appDispatch(setIsPreloaderOpen(false));
  //  taskErrorMessage.message === '' ? appDispatch(setIsConfirmModalOpen(false)) : errorMessage = taskErrorMessage;
    }
    appDispatch(setDeletedItem(null));
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
          {err(errorMessage)}
        </Box>
      </Fade>
    </Modal>
  );
}

export default ConfirmationModal;