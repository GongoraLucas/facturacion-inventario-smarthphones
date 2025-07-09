import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { RoleRoute } from './RoleRoute';
import { SalesHome } from '../pages/SalesHome';
import { ProductPage } from '../pages/ProductPage';
import { UserPage } from '../pages/UserPage';
import { DashboardHome } from '../pages/DashboardHome';

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route element={<RoleRoute roles={['vendedor']} />}>
          <Route index element={<SalesHome />} />
          <Route path="ventas" element={<SalesHome />} />
        </Route>

        <Route element={<RoleRoute roles={['admin']} />}>
          <Route path="productos" element={<ProductPage />} />
          <Route path="usuarios" element={<UserPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
