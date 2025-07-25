import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

export const Sidebar = ({ handleDrawerToggle, isMobile }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isSelected = (path) => location.pathname === path;

  const sidebarSeller = (
    <>
      <ListItem disablePadding>
        <ListItemButton
          selected={isSelected('/dashboard')}
          onClick={() => {
            navigate('/dashboard');
          }}
        >
          <HomeIcon sx={{marginRight:2}}/>
          <ListItemText primary="Inicio" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          selected={isSelected('/dashboard/ventas')}
          onClick={() => {
            navigate('/dashboard/ventas');
          }}
        >
          <AttachMoneyIcon sx={{marginRight:2}}/>
          <ListItemText primary="Ventas" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          selected={isSelected('/dashboard/clientes')}
          onClick={() => {
            navigate('/dashboard/clientes');
          }}
        >
          <PeopleIcon sx={{marginRight:2}}/>
          <ListItemText primary="Clientes" />
        </ListItemButton>
      </ListItem>
    </>
  );

  const sidebarAdmin = (
    <>
      <ListItemButton
        selected={isSelected('/dashboard')}
        onClick={() => {
          navigate('/dashboard');
        }}
      >
        <HomeIcon sx={{marginRight:2}}/>
        <ListItemText primary="Inicio" />
      </ListItemButton>
      <ListItem disablePadding>
        <ListItemButton
          selected={isSelected('/dashboard/productos')}
          onClick={() => navigate('/dashboard/productos')}
        >
          <SmartphoneIcon sx={{marginRight:2}}/>
          <ListItemText primary="Productos" />
        </ListItemButton>
      </ListItem>
      {/* <ListItem disablePadding>
        <ListItemButton
          selected={isSelected('/dashboard/usuarios')}
          onClick={() => navigate('/dashboard/usuarios')}
        >
          <ListItemText primary="Usuarios" />
        </ListItemButton>
      </ListItem> */}
    </>
  );
  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        {isMobile ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              {user?.name}
            </Typography>
            <IconButton onClick={() => handleDrawerToggle()}>
              <ArrowBack />
            </IconButton>
          </Box>
        ) : (
          <Typography variant="h6" sx={{ my: 2 }}>
            {user?.name}
          </Typography>
        )}

        <List>
          {user?.role === 'vendedor' && sidebarSeller}
          {user?.role === 'admin' && sidebarAdmin}
        </List>
      </Box>
    </>
  );
};
