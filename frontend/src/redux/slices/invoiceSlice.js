import { createSlice } from '@reduxjs/toolkit';

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    data: [],
    isLoading: false,
  },
  reducers: {
    startLoadingInvoices: (state) => {
      state.isLoading = true;
    },
    setInvoices: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    addInvoice: (state, action) => {
      state.data.push(action.payload);
    },
    removeInvoice: (state, action) => {
      state.data = state.data.filter((invoice) => invoice._id !== action.payload);
    },
  },
});

export const { startLoadingInvoices, setInvoices, addInvoice, removeInvoice} = invoiceSlice.actions;
export default invoiceSlice.reducer;
