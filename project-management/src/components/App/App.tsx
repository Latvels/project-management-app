import React from 'react';
import './App.css';
import MainRoutes from '../../routes/routes';
import { Footer, Header } from '../../components/compunents';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/reducer/reducer';
import CreateNewBoardModal from '../CreateNewBoardModal/CreateNewBoardModal';



export default function App() {
  // const appDispatch = useDispatch();
  // const appState = useSelector((state: RootState) => state.appState);

  return (
    <div className="App">
      <Header />
      <MainRoutes />
      <Footer />
      <CreateNewBoardModal></CreateNewBoardModal>
    </div>
  );
}