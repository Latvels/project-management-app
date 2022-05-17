import React from 'react';
// import './App.css';
import MainRoutes from '../../routes/routes';
import { CreateNewBoardModal, EditProfileModal, Footer, Header, BasicAlerts } from '../../components/compunents';
import { Preloader } from '../compunents';



export default function App() {
 const er = {
  status: 100,
  message: 'string',
  visible: true,
 }
  return (
    <div>
      <Header />
      <MainRoutes />
      <Footer />
      <CreateNewBoardModal />
      <EditProfileModal />
      <Preloader />
    </div>
  );
}