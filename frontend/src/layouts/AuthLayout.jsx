import { useTheme } from '@emotion/react';
import { Box, Container, Typography } from '@mui/material';
import { AuthTitle } from '../components/AuthTitle';

export const AuthLayout = ({ children, title = '', handleSubmit=()=>{} }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: 1,
        }}
      >
        <AuthTitle />
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              p: 4,
              border: '1px solid #ccc',
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: '#fff',
              margin: 10,
            }}
          >
            <Typography variant="h4" component="h2" align="center">
              {title}
            </Typography>
            {children}
          </Box>
        </Container>
      </Box>
    </>
  );
};
