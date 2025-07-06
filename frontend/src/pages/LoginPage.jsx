import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { SignIn } from '../redux/thunks/authThunks';

const initialForm = {
  email: '',
  password: '',
};
export const LoginPage = () => {
  const theme = useTheme();
  const { isChecking } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(initialForm);
  const [error, setError] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError('');

    if (!email || !password) {
      return setError('Llene todos los campos');
    }

    dispatch(SignIn(email, password, setError, setOpenSnack));
  };

  const handleSnackClose = () => {
    setOpenSnack(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3" component="h1" align="center" color="#fff">
        Facturación y Gestión de Smartphones
      </Typography>

      <Container maxWidth="sm" sx={{ mt: 8 }}>
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
          }}
        >
          <Typography variant="h4" component="h2" align="center">
            Iniciar sesión
          </Typography>

          <TextField
            label="Correo electrónico"
            type="email"
            name="email"
            value={email}
            onChange={onInputChange}
            disabled={isChecking}
            fullWidth
          />

          <TextField
            label="Contraseña"
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            disabled={isChecking}
            fullWidth
          />

          {error && <Alert severity="error">{error}</Alert>}

          <Button
            type="submit"
            variant="contained"
            disabled={isChecking}
            sx={{ mt: 1, height: '45px' }}
            fullWidth
          >
            Entrar
          </Button>
          <Typography align="right">
            {' '}
            ¿No tienes una cuenta? <Link to="/auth/register">Registrate</Link>{' '}
          </Typography>
        </Box>
      </Container>

      <Snackbar
        open={openSnack}
        autoHideDuration={1000}
        onClose={handleSnackClose}
        message="Cargando..."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};
