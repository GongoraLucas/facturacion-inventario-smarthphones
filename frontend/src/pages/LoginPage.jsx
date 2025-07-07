import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { useState } from 'react';
import {
  Alert,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { SignIn } from '../redux/thunks/authThunks';
import { AuthLayout } from '../layouts/AuthLayout';

const initialForm = {
  email: '',
  password: '',
};
export const LoginPage = () => {
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
    <>
      <AuthLayout title='Iniciar sesión' handleSubmit={handleSubmit}>
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
      </AuthLayout>

      <Snackbar
        open={openSnack}
        autoHideDuration={1000}
        onClose={handleSnackClose}
        message="Cargando..."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};
