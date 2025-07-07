import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { register } from '../redux/thunks/authThunks';
import { Title } from '../components/AuthTitle';

const initialForm = {
  name: '',
  email: '',
  password: '',
  role: '',
};
export const RegisterPage = () => {
  const theme = useTheme();
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
        <Title />
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
              margin: 1,
            }}
          >
            <Typography variant="h4" component="h2" align="center">
              Registrate
            </Typography>

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
    </>
  );
};
