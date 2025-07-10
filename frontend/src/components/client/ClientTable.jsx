import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import { Delete} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDeleteClient, deleteClientById } from '../../redux/thunks/clientThunks';
import { useNavigate } from 'react-router-dom';

export const ClientTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: clients, isLoading } = useSelector((state) => state.client);

  if (isLoading) return <Typography>Cargando clientes...</Typography>;
  if (!clients.length) return <Typography>No hay clientes registrados.</Typography>;

  const goToUpdate = (id) => {
    navigate(`/dashboard/clientes/update/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Cédula</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client._id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.cedula}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell align="right">
                <IconButton color="info" onClick={() => goToUpdate(client._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => dispatch(confirmDeleteClient(client._id))}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
