import React from 'react';
// import './App.css';
import MainRoutes from '../../routes/routes';
import { CreateNewBoardModal, EditProfileModal, Footer, Header, Preloader, ConfirmationModal } from '../compunents';



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
    </div>
  );
}