import { createSlice } from '@reduxjs/toolkit';

const initialSnackbarState = {
  open: false,
  msg: '',
  severity: 'info', // 'success' | 'error' | 'info' | 'warning'
  confirmation: false, // indica si es modo confirmación
  onAccept: null,       // función opcional
  onCancel: null,       // función opcional
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    snackbar: initialSnackbarState,
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.snackbar = {
        ...initialSnackbarState,
        open: true,
        ...action.payload,
      };
    },
    hideSnackbar: (state) => {
      state.snackbar = { ...initialSnackbarState };
    },
  },
});

export const { showSnackbar, hideSnackbar } = uiSlice.actions;
export default uiSlice.reducer;
