import api from '../../services/api';
import {
  addInvoice,
  removeInvoice,
  setInvoices,
  startLoadingInvoices,
} from '../slices/invoiceSlice';
import { hideSnackbar, showSnackbar } from '../slices/uiSlice';

export const fetchInvoices = () => {
  return async (dispatch) => {
    dispatch(startLoadingInvoices());
    try {
      const res = await api.get('/invoices');
      dispatch(setInvoices(res.data));
    } catch (error) {
      dispatch(
        showSnackbar({
          msg: 'Error al cargar facturas',
          severity: 'error',
        })
      );
    }
  };
};

export const createNewInvoice = (invoiceData) => {
  console.log(JSON.stringify(invoiceData));
  return async (dispatch) => {
    try {
      const res = await api.post('/invoices', invoiceData);
      dispatch(addInvoice(res.data));
      dispatch(
        showSnackbar({
          msg: 'Factura registrada con éxito',
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        showSnackbar({
          msg: error.response?.data?.message || 'Error al crear factura',
          severity: 'error',
        })
      );
    }
  };
};

export const deleteInvoiceById = (invoiceId) => {
  return async (dispatch) => {
    try {
      await api.delete(`/invoices/${invoiceId}`);
      dispatch(removeInvoice(invoiceId));
      dispatch(
        showSnackbar({
          msg: 'Factura eliminada correctamente',
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(setProductError(error.message));
      dispatch(
        showSnackbar({
          msg: error.response?.data?.message || 'Error al eliminar producto',
          severity: 'error',
        })
      );
    }
  };
};

export const confirmDeleteInvoice = (invoiceId) => {
  return async (dispatch) => {
    dispatch(
      showSnackbar({
        msg: '¿Estás seguro de eliminar esta factura?',
        severity: 'warning',
        confirmation: true,
        onAccept: () => dispatch(deleteInvoiceById(invoiceId)),
        onCancel: () => dispatch(showSnackbar({msg:"Se cancelo la eliminacion de la factura",severity:"info"})),
      })
    );
  };
};
