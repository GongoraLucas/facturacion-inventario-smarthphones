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
  },
});

export const { startLoadingInvoices, setInvoices, addInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
