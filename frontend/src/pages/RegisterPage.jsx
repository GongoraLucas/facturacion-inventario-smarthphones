import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { register } from '../redux/thunks/authThunks';
import { AuthLayout } from '../layouts/AuthLayout';
import { showSnackbar } from '../redux/slices/uiSlice';

const initialForm = {
  name: '',
  email: '',
  password: '',
  role: '',
};
export const RegisterPage = () => {
  const { isChecking } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { name, email, password, role, onInputChange } = useForm(initialForm);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!name || !email || !password || role === '') {
      return dispatch(showSnackbar({ msg: 'Llene todos los campos', severity: 'error' }));
    }
    dispatch(register(name, email, password, role));
  };

  return (
    <>
      <AuthLayout title="Registrate" handleSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          type="text"
          name="name"
          value={name}
          onChange={onInputChange}
          disabled={isChecking}
          fullWidth
        />

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

        <RadioGroup
          name="role"
          value={role}
          onChange={onInputChange}
          disabled={isChecking}
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <Typography sx={{ marginRight: '20px' }}>Rol:</Typography>
          <Box>
            <FormControlLabel control={<Radio />} label="administrador" value="admin" />
            <FormControlLabel control={<Radio />} label="vendedor" value="vendedor" />
          </Box>
        </RadioGroup>

        <Button
          type="submit"
          variant="contained"
          disabled={isChecking}
          sx={{ mt: 1, height: '45px' }}
          fullWidth
        >
          Registrar
        </Button>
        <Typography align="right">
          {' '}
          ¿Ya tienes una cuenta? <Link to="/auth/login">Inicia sesión</Link>{' '}
        </Typography>
      </AuthLayout>
    </>
  );
};
