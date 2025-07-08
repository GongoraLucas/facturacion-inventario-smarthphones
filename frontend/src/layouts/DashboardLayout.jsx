import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <>
      <h1>Bienvenido al DashBoard</h1>
      <Outlet />
    </>
  );
};
