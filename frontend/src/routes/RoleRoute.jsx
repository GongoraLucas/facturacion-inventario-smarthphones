import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const RoleRoute = ({ roles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }


  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

  if ( !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};
