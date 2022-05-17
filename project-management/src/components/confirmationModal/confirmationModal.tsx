import react, { Component, ReactNode } from 'react';
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
import './confirmationModal.scss';
import React from 'react';
import ReactDOM from 'react-dom';

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

interface IConfirmationModalProps {
  handleYesClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleNoClick: (e: React.MouseEvent<HTMLElement>) => void;
  deletedItem: 'user' | 'task' | 'board';
};


function ConfirmationModal() {
  const {t} = useTranslation();
  // const appState = useSelector((state: RootState) => state.appState);
  // const appDispatch = useDispatch();
  // const handleClose = () => appDispatch(setIsEditProfileModalOpen(false));
  const title = t('confirmationModal:title');
  const commonText=t('confirmationModal:commonText');
  const deleteUserText=t('confirmationModal:deleteUserText');
  const deleteTaskText=t('confirmationModal:deleteTaskText');
  const deleteBoardText=t('confirmationModal:deleteBoardText');
  const buttonYesText=t('confirmationModal:buttonYes');
  const buttonNoText=t('confirmationModal:buttonNo');

  // const getConfirmationText = (): string => {
  //   switch (deletedItem) {
  //     case 'user':
  //       return `${commonText} ${deleteUserText}?`;
  //       break;
  //     case 'board':
  //       return `${commonText} ${deleteBoardText}?`;
  //       break;
  //     case 'task':
  //       return `${commonText} ${deleteTaskText}?`;
  //   }
  // }

  const handleYesClick = () => {
    console.log('yes')
  };

  const handleNoClick = () => {
    console.log('no')
  };

  const handleClose = () => {
    console.log('close modal');
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: TIMEOUT_FOR_MODAL,
      }}
    >
      <Fade in={true} >
        <Box sx={style}>
          <Box component='div' className="modal__title" sx={{mb: 2}}>
            <WarningAmberOutlinedIcon color='warning' sx={{mr: 2}}></WarningAmberOutlinedIcon>
            <Typography id="transition-modal-title" variant="h6" component="h4" color="warning">
              {title}
            </Typography>
          </Box>
          <Box component='div' className="modal__text-wrapper" sx={{mb: 2}}>
            <Typography id="transition-modal-title" variant="h6" component="h6">
              {/* <p>{getConfirmationText()}</p> */}
              <p>some text</p>
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