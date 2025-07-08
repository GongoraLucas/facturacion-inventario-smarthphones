import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


export const RoleRoute = ({ roles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

  if (!roles.includes(user?.role)) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};
