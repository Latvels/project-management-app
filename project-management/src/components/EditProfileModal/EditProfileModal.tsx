import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import { setIsEditProfileModalOpen } from '../../store/action/appStateAction';
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import './editProfileModal.scss';
import { useTranslation } from 'react-i18next';
import { EditProfileFormFormik } from '../compunents';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function EditProfileModal() {
  const {t} = useTranslation();
  const appState = useSelector((state: RootState) => state.appState);
  const appDispatch = useDispatch();
  const handleClose = () => appDispatch(setIsEditProfileModalOpen(false));

  return (
    <div >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={appState.isEditProfileModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 700,
        }}
      >
        <Fade in={appState.isEditProfileModalOpen} >
          <Box sx={style}>
          {/* <Box className='modal__window'> */}
            <Box component='div' className="modal__title" sx={{mb: 2}}>
              <FaceRetouchingNaturalOutlinedIcon color='primary' sx={{mr: 2}}></FaceRetouchingNaturalOutlinedIcon>
              <Typography id="transition-modal-title" variant="h6" component="h4">
                {t('editProfileForm:formTitle')}
              </Typography>
            </Box>
            <EditProfileFormFormik />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditProfileModal;