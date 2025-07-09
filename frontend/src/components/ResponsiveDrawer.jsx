
import { Drawer } from '@mui/material';

export const ResponsiveDrawer = ({ isMobile, open, onClose, children }) => {
  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? open : true}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: isMobile ? 'block' : 'none', sm: isMobile ? 'none' : 'block' },
        '& .MuiDrawer-paper': { width: 240 },
      }}
    >
      {children}
    </Drawer>
  );
};
