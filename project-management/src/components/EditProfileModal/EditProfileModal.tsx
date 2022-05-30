import react from 'react';
import { Backdrop, Box, Modal, Fade, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import { setIsEditProfileModalOpen } from '../../store/action/appStateAction';
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import { useTranslation } from 'react-i18next';
import { EditProfileFormFormik } from '../compunents';
import { TIMEOUT_FOR_MODAL } from '../../constants/constant';
import { AppDispatch } from '../../store/store';
import { userSlise } from '../../api/userApi';
import './editProfileModal.scss';

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

function EditProfileModal() {
  const appState = useSelector((state: RootState) => state.appState);
  const appDispatch = useDispatch<AppDispatch>();
  const { resetUserRequestStatus } = userSlise.actions;

  const { t } = useTranslation();

  const handleClose = () => {
    appDispatch(resetUserRequestStatus());
    appDispatch(setIsEditProfileModalOpen(false));
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={appState.isEditProfileModalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: TIMEOUT_FOR_MODAL,
      }}
    >
      <Fade in={appState.isEditProfileModalOpen}>
        <Box sx={style}>
          <Box component="div" className="modal__title" sx={{ mb: 2 }}>
            <FaceRetouchingNaturalOutlinedIcon
              color="primary"
              sx={{ mr: 2 }}
            ></FaceRetouchingNaturalOutlinedIcon>
            <Typography id="transition-modal-title" variant="h6" component="h4" color="primary">
              {t('editProfileForm:formTitle')}
            </Typography>
          </Box>
          <EditProfileFormFormik />
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditProfileModal;
