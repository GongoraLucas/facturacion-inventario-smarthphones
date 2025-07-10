import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    startLoadingClients: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setClients: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    addClient: (state, action) => {
      state.data.push(action.payload);
    },
    removeClient: (state, action) => {
      state.data = state.data.filter((c) => c._id !== action.payload);
    },
    setClientError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  startLoadingClients,
  setClients,
  addClient,
  removeClient,
  setClientError,
} = clientSlice.actions;

export default clientSlice.reducer;
