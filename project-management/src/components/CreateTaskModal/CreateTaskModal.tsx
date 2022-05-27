import * as React from 'react';
import { Backdrop, Box, Modal, Fade, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import { setIsCreateTaskModalOpen } from '../../store/action/appStateAction';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { useTranslation } from 'react-i18next';
import { CreateElemFormFormik } from '../compunents';
import { TIMEOUT_FOR_MODAL } from '../../constants/constant';
import './createNewTaskModal.scss';

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

function CreateTaskModal() {
  const appState = useSelector((state: RootState) => state.appState);
  const appDispatch = useDispatch();
  const handleClose = () => appDispatch(setIsCreateTaskModalOpen(false));

  const { t } = useTranslation();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={appState.isCreateTaskModalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: TIMEOUT_FOR_MODAL,
      }}
    >
      <Fade in={appState.isCreateTaskModalOpen}>
        <Box sx={style}>
          <Box component="div" className="modal__title" sx={{ mb: 2 }}>
            <NoteAddOutlinedIcon color="primary" sx={{ mr: 2 }}></NoteAddOutlinedIcon>
            <Typography id="transition-modal-title" variant="h6" component="h4" color="primary">
              {t('createTaskForm:formTitle')}
            </Typography>
          </Box>
          <CreateElemFormFormik elemType='task' />
        </Box>
      </Fade>
    </Modal>
  );
}

export default CreateTaskModal;