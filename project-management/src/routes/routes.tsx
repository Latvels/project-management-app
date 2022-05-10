import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import { Dashboard } from '../components/compunents'
import { NotFoundPage } from '../pages/pages'

const MainRoutes = () => (
	<Routes>
		<Route path="*" element={<Navigate replace to="404" />} />
		<Route path="/" element={<Dashboard />} />
		<Route path="/404" element={<NotFoundPage />} />
	</Routes>
)

export default MainRoutes;