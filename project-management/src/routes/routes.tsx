import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// import { Dashboard } from '../components/compunents'
import {NotFoundPage, WelcomePage, MainPage, BoardPage, LoginPage, Registration} from '../pages/pages';

const MainRoutes = () => (
  <Routes>
    <Route path="*" element={<Navigate replace to="404" />} />
    <Route path="/" element={<WelcomePage />} />
    <Route path="/mainPage" element={<MainPage />} />
    <Route path="/boardPage" element={<BoardPage />} />
    <Route path="/404" element={<NotFoundPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<Registration />} />
    <Route path="/signin" element={<LoginPage />} />
  </Routes>
);

export default MainRoutes;
