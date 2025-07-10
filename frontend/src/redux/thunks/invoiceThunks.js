import api from '../../services/api';
import { addInvoice, setInvoices, startLoadingInvoices } from '../slices/invoiceSlice';
import { showSnackbar } from '../slices/uiSlice';

export const fetchInvoices = () => {
  return async (dispatch) => {
    dispatch(startLoadingInvoices());
    try {
      const res = await api.get('/invoices');
      dispatch(setInvoices(res.data));
    } catch (error) {
      dispatch(showSnackbar({
        msg: 'Error al cargar facturas',
        severity: 'error',
      }));
    }
  };
};

export const createNewInvoice = (invoiceData) => {
    console.log(JSON.stringify(invoiceData))
  return async (dispatch) => {
    try {
    
      const res = await api.post('/invoices', invoiceData);
      dispatch(addInvoice(res.data));
      dispatch(showSnackbar({
        msg: 'Factura registrada con éxito',
        severity: 'success',
      }));
    } catch (error) {
      dispatch(showSnackbar({
        msg: error.response?.data?.message || 'Error al crear factura',
        severity: 'error',
      }));
    }
  };
};
