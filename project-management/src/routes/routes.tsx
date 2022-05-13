import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// import { Dashboard } from '../components/compunents'
import { NotFoundPage, WelcomePage, MainPage, BoardPage } from '../pages/pages';

const MainRoutes = () => (
  <Routes>
    <Route path="*" element={<Navigate replace to="404" />} />
    <Route path="/" element={<WelcomePage />} />
    <Route path="/mainPage" element={<MainPage />} />
    <Route path="/boardPage" element={<BoardPage />} />
    <Route path="/404" element={<NotFoundPage />} />
  </Routes>
);

export default MainRoutes;
