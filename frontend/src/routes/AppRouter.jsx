import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { ProtectedPrivateRoutes } from './ProtectedPrivateRoutes';
import { ProtectedPublicRoutes } from './ProtectedPublicRoutes';
import { useDispatch } from 'react-redux';
import { loadUser } from '../redux/thunks/authThunks';
import { useEffect } from 'react';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedPublicRoutes />}>
          <Route path="/auth/*" element={<PublicRoutes />} />
        </Route>

        <Route element={<ProtectedPrivateRoutes />}>
          <Route path="/*" element={<PrivateRoutes />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </>
  );
};
