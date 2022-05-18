import React from 'react';
// import './App.css';
import MainRoutes from '../../routes/routes';
import { CreateNewBoardModal, EditProfileModal, Footer, Header, BasicAlerts } from '../../components/compunents';
import { Preloader } from '../compunents';



export default function App() {

  return (
    <div>
      <Header />
      <MainRoutes />
      <Footer />
      <CreateNewBoardModal />
      <EditProfileModal />
      <BasicAlerts />
      <Preloader />
    </div>
  );
}