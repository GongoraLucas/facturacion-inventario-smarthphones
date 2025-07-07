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
  const [error, setError] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError('');

    if (!name || !email || !password || role === '') {
      return setError('Llene todos los campos');
    }
    dispatch(register(name, email, password, role, setError, setOpenSnack));
  };

  const handleSnackClose = () => {
    setOpenSnack(false);
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

        {error && <Alert severity="error">{error}</Alert>}

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
