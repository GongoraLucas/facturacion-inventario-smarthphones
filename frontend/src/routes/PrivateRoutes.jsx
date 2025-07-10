import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { RoleRoute } from './RoleRoute';
import { SalesPage } from '../pages/SalesPage';
import { ProductPage } from '../pages/ProductPage';
import { UserPage } from '../pages/UserPage';
import { DashboardHome } from '../pages/DashboardHome';
import { DashboardSeller } from '../pages/DashboardSeller';
import { ClientPage } from '../pages/ClientPage';

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route element={<RoleRoute roles={['vendedor']} />}>
          <Route index element={<DashboardSeller />} />
          <Route path="ventas" element={<SalesPage />} />
          <Route path="clientes" element={<ClientPage />} />
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
