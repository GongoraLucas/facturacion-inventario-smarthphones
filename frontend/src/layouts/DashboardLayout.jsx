import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Box, CssBaseline, Drawer, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Navbar } from '../components/Navbar';
import { ResponsiveDrawer } from '../components/ResponsiveDrawer';

const drawerWidth = 240;
export const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openMobile, setOpenMobile] = useState(false);

  const handleDrawerToggle = () => {
    setOpenMobile(!openMobile);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
        <Box component={'nav'}>
          <ResponsiveDrawer isMobile={isMobile} open={openMobile} onClose={handleDrawerToggle}>
            <Sidebar handleDrawerToggle={handleDrawerToggle} isMobile={isMobile} />
          </ResponsiveDrawer>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};
