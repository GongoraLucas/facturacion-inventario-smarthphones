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
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClientById } from '../../redux/thunks/clientThunks';

export const ClientTable = () => {
  const dispatch = useDispatch();
  const { data: clients, isLoading } = useSelector((state) => state.client);

  if (isLoading) return <Typography>Cargando clientes...</Typography>;
  if (!clients.length) return <Typography>No hay clientes registrados.</Typography>;

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
                <IconButton color="error" onClick={() => dispatch(deleteClientById(client._id))}>
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
