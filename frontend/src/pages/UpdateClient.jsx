import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { Box, Button, MenuItem, TextField, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateClientById } from '../redux/thunks/clientThunks';

export const UpdateClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: clients } = useSelector((state) => state.client);
  const [visible, setVisible] = useState(true);

  const clientSelected = useMemo(() => clients.find((client) => client._id === id), [clients, id]);

  if (!clientSelected) return <Typography>Cargando cliente...</Typography>;

  const { name, email, cedula, onInputChange } = useForm(clientSelected);

  const handleClose = () => {
    setVisible(false);
    navigate(-1); // regresar a la página anterior al cerrar
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateClientById(id, { name, email, cedula }));

    handleClose();
  };

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: 2,
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">Actualizar producto</Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Typography variant="h6" mb={2}>
          Actualizar cliente
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Nombre" name="name" value={name} onChange={onInputChange} required />

          <TextField
            label="Correo electrónico"
            name="email"
            value={email}
            onChange={onInputChange}
            type="email"
          />

          <TextField
            label="Cédula"
            name="cedula"
            value={cedula}
            onChange={onInputChange}
            required
            inputProps={{ maxLength: 10, pattern: '[0-9]{10}' }}
            helperText="Debe contener exactamente 10 dígitos"
          />

          <Button type="submit" variant="contained">
            Actualizar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
