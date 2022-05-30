import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/reducer';
import { CircularProgress } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

function Preloader() {
  const appState = useSelector((state: RootState) => state.appState);

  return (
    <div tabIndex={Number(-1)}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={appState.isPreloaderOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 700,
        }}
        tabIndex={Number(-1)}
      >
        <Fade in={appState.isPreloaderOpen} tabIndex={Number(-1)}>
          <Box sx={style} tabIndex={Number(-1)}>
            <CircularProgress className="preloader" color="secondary" />
            <CircularProgress className="preloader" color="info" />
            <CircularProgress className="preloader" color="secondary" />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Preloader;
