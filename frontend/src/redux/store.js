import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import uiReducer from './slices/uiSlice.js';
import productReducer from './slices/productSlice';
import clientReducer from './slices/clientSlice.js';
import invoiceReducer from './slices/invoiceSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    product:productReducer,
    client:clientReducer,
    invoice:invoiceReducer
  },
});

export default store;
