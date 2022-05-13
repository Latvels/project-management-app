import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BoardPage from '../pages/BoardPage/BoardPage';
import MainPage from '../pages/MainPage/MainPage';

// import { Dashboard } from '../components/compunents'
import { NotFoundPage } from '../pages/pages';
import WelcomePage from '../pages/WelcomePage/WelcomePage';

const MainRoutes = () => (
  <Routes>
    <Route path="*" element={<Navigate replace to="404" />} />
    <Route path="/welcomePage" element={<WelcomePage />} />
    <Route path="/mainPage" element={<MainPage />} />
    <Route path="/boardPage" element={<BoardPage />} />
    <Route path="/404" element={<NotFoundPage />} />
  </Routes>
);

export default MainRoutes;
