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
import { showSnackbar } from '../redux/slices/uiSlice';

const initialForm = {
  email: '',
  password: '',
};
export const LoginPage = () => {
  const { isChecking } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(initialForm);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      return dispatch(showSnackbar({msg:"Llene todos los campos", severity:"error"}));
    }

    dispatch(SignIn(email, password));
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

    </>
  );
};
