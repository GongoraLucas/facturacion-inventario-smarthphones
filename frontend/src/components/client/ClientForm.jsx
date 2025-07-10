import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { createNewClient } from '../../redux/thunks/clientThunks';
import { showSnackbar } from '../../redux/slices/uiSlice';

const initialForm = {
  name: '',
  email: '',
  cedula: '',
};

export const ClientForm = () => {
  const dispatch = useDispatch();
  const { name, email, cedula, onInputChange, onResetForm } = useForm(initialForm);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !cedula) {
      dispatch(showSnackbar({ msg: 'Nombre y cédula son obligatorios', severity: 'warning' }));
      return;
    }

    if (!/^\d{10}$/.test(cedula)) {
      dispatch(showSnackbar({ msg: 'Cédula inválida: deben ser 10 dígitos', severity: 'error' }));
      return;
    }

    dispatch(createNewClient({ name, email, cedula }));
    onResetForm();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" mb={2}>
        Registrar cliente
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nombre"
          name="name"
          value={name}
          onChange={onInputChange}
          fullWidth
          required
          
        />

        <TextField
          label="Correo electrónico"
          name="email"
          value={email}
          onChange={onInputChange}
          fullWidth
          type="email"
        />

        <TextField
          label="Cédula"
          name="cedula"
          value={cedula}
          onChange={onInputChange}
          fullWidth
          required
          inputProps={{ maxLength: 10, pattern: '[0-9]{10}' }}
          helperText="Debe contener exactamente 10 dígitos"
        />

        <Button type="submit" variant="contained">
          Guardar cliente
        </Button>
      </Box>
    </Box>
  );
};
