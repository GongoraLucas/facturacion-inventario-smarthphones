import api from '../../services/api';
import {
  startLoadingProducts,
  setProducts,
  addProduct,
  removeProduct,
  setProductError,
} from '../slices/productSlice';
import { showSnackbar } from '../slices/uiSlice';

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(startLoadingProducts());
    try {
      const res = await api.get('/products');
      dispatch(setProducts(res.data));
    } catch (error) {
      dispatch(setProductError(error.message));
      dispatch(
        showSnackbar({
          msg: error.response?.data?.message || 'Error al cargar productos',
          severity: 'error',
        })
      );
    }
  };
};

export const createNewProduct = (productData) => {
  return async (dispatch) => {
    dispatch(startLoadingProducts());
    try {
      const res = await api.post('/products', productData);
      dispatch(addProduct(res.data));
      dispatch(
        showSnackbar({
          msg: 'Producto creado exitosamente',
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(setProductError(error.message));
      dispatch(
        showSnackbar({
          msg: error.response?.data?.message || 'Error al crear producto',
          severity: 'error',
        })
      );
    }
  };
};

export const deleteProductById = (productId) => {
  return async (dispatch) => {
    try {
      await api.delete(`/products/${productId}`);
      dispatch(removeProduct(productId));
      dispatch(
        showSnackbar({
          msg: 'Producto eliminado correctamente',
          severity: 'info',
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
