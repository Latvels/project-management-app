import React from 'react';
// import './App.css';
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

export default function App() {
  return (
    <div>
      <Header />
      <MainRoutes />
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
