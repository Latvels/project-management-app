import react from 'react';
import { Backdrop, Box, Modal, Fade, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import { setIsEditTaskModalOpen } from '../../store/action/appStateAction';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useTranslation } from 'react-i18next';
import { EditTaskFormFormik } from '../compunents';
import { TIMEOUT_FOR_MODAL } from '../../constants/constant';
import { AppDispatch } from '../../store/store';
import { taskSlise } from '../../api/taskApi';
import './editTaskModal.scss';

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

function EditTaskModal() {
  const appState = useSelector((state: RootState) => state.appState);
  const appDispatch = useDispatch<AppDispatch>();
  const {resetTaskRequestStatus} = taskSlise.actions;

  const { t } = useTranslation();

  const handleClose = () => {
    appDispatch(resetTaskRequestStatus());
    appDispatch(setIsEditTaskModalOpen(false));
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={appState.isEditTaskModalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: TIMEOUT_FOR_MODAL,
      }}
    >
      <Fade in={appState.isEditTaskModalOpen}>
        <Box sx={style}>
          <Box component="div" className="modal__title" sx={{ mb: 2 }}>
            <AssignmentOutlinedIcon
              color="primary"
              sx={{ mr: 2 }}
            ></AssignmentOutlinedIcon>
            <Typography id="transition-modal-title" variant="h6" component="h4" color="primary">
              {t('editTaskForm:formTitle')}
            </Typography>
          </Box>
          <EditTaskFormFormik />
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditTaskModal;
