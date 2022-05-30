import React from 'react';
import MainRoutes from '../../routes/routes';
import {
  CreateNewBoardModal,
  EditProfileModal,
  Footer,
  Header,
  Preloader,
  ConfirmationModal,
  CreateTaskModal,
  CreateColumnModal,
  EditTaskModal,
} from '../compunents';
import { Box } from '@mui/material';

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'spase-between',
        flexGrow: 1,
      }}
    >
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <MainRoutes />
      </Box>
      <Footer />
      <CreateNewBoardModal />
      <EditProfileModal />
      <Preloader />
      <ConfirmationModal />
      <CreateTaskModal />
      <CreateColumnModal />
      <EditTaskModal />
    </div>
  );
}
