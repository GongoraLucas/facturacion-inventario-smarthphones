import { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchClients } from '../redux/thunks/clientThunks';
import { ClientForm } from '../components/client/ClientForm';
import { ClientTable } from '../components/client/ClientTable';

export const ClientPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  return (
    <Container maxWidth="md" size={{xs:12,md:6}}>
      <Typography variant="h4" mb={4}>
        Gestión de Clientes
      </Typography>
      <ClientForm />
      <ClientTable />
    </Container>
  );
};
