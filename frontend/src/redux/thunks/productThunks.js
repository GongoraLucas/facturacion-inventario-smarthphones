import api from '../../services/api';
import {
  startLoadingProducts,
  setProducts,
  addProduct,
  removeProduct,
  setProductError,
  updateProduct,
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


export const confirmDeleteProduct= (invoiceId) => {
  return async (dispatch) => {
    dispatch(
      showSnackbar({
        msg: '¿Estás seguro de eliminar este producto?',
        severity: 'warning',
        confirmation: true,
        onAccept: () => dispatch(deleteProductById(invoiceId)),
        onCancel: () => dispatch(showSnackbar({msg:"Se cancelo la eliminacion del producto",severity:"info"})),
      })
    );
  };
};


export const updateProductById = (productId, updatedData) => {
  return async (dispatch) => {
    try {
      const { data } = await api.put(`/products/${productId}`, updatedData);
      dispatch(updateProduct(data));
      dispatch(showSnackbar({ msg: 'Producto actualizado correctamente', severity: 'success' }));
    } catch (error) {
      dispatch(setClientError(error.message));
      dispatch(showSnackbar({ msg: 'Error al actualizar producto', severity: 'error' }));
    }
  };
};