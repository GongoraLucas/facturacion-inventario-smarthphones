import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    startLoadingProducts: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setProducts: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    addProduct: (state, action) => {
      state.data.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.data = state.data.filter((prod) => prod._id !== action.payload);
    },
    setProductError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  startLoadingProducts,
  setProducts,
  addProduct,
  removeProduct,
  setProductError,
} = productSlice.actions;

export default productSlice.reducer;
