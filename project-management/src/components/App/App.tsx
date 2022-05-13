import React from 'react';
import './App.css';
import MainRoutes from '../../routes/routes';
import { Footer, Header } from '../../components/compunents';



export default function App() {

  return (
    <div className="App">
      <Header />
      <MainRoutes />
      <Footer />
    </div>
  );
}