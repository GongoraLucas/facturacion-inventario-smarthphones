import api from '../../services/api';
import {
  startLoadingClients,
  setClients,
  addClient,
  removeClient,
  setClientError,
  updateClient,
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
      dispatch(showSnackbar({ msg: 'Cliente eliminado', severity: 'success' }));
    } catch (error) {
      dispatch(setClientError(error.message));
      dispatch(showSnackbar({ msg: 'Error al eliminar cliente', severity: 'error' }));
    }
  };
};


export const confirmDeleteClient = (clientId) => {
  return async (dispatch) => {
    dispatch(
      showSnackbar({
        msg: '¿Estás seguro de eliminar esta factura?',
        severity: 'warning',
        confirmation: true,
        onAccept: () => dispatch(deleteClientById(clientId)),
        onCancel: () => dispatch(showSnackbar({msg:"Se cancelo la eliminacion del cliente", severity:"info"})),
      })
    );
  };
};

export const updateClientById = (clientId, updatedData) => {
  return async (dispatch) => {
    try {
      const { data } = await api.put(`/clients/${clientId}`, updatedData);
      dispatch(updateClient(data));
      dispatch(showSnackbar({ msg: 'Cliente actualizado correctamente', severity: 'success' }));
    } catch (error) {
      dispatch(setClientError(error.message));
      dispatch(showSnackbar({ msg: 'Error al actualizar cliente', severity: 'error' }));
    }
  };
};