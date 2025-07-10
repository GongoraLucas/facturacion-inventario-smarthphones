import api from '../../services/api';
import {
  startLoadingClients,
  setClients,
  addClient,
  removeClient,
  setClientError,
} from '../slices/clientSlice';
import { showSnackbar } from '../slices/uiSlice';

export const fetchClients = () => {
  return async (dispatch) => {
    dispatch(startLoadingClients());
    try {
      const { data } = await api.get('/clients');
      dispatch(setClients(data));
    } catch (error) {
      dispatch(setClientError(error.message));
      dispatch(showSnackbar({ msg: 'Error al cargar clientes', severity: 'error' }));
    }
  };
};

export const createNewClient = (clientData) => {
  return async (dispatch) => {
    try {
      const { data } = await api.post('/clients', clientData);
      dispatch(addClient(data));
      dispatch(showSnackbar({ msg: 'Cliente creado exitosamente', severity: 'success' }));
    } catch (error) {
      dispatch(setClientError(error.message));
      dispatch(showSnackbar({ msg: 'Error al crear cliente', severity: 'error' }));
    }
  };
};

export const deleteClientById = (clientId) => {
  return async (dispatch) => {
    try {
      await api.delete(`/clients/${clientId}`);
      dispatch(removeClient(clientId));
      dispatch(showSnackbar({ msg: 'Cliente eliminado', severity: 'info' }));
    } catch (error) {
      dispatch(setClientError(error.message));
      dispatch(showSnackbar({ msg: 'Error al eliminar cliente', severity: 'error' }));
    }
  };
};
