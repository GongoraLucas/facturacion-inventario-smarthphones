import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isChecking: false,
    token: initialToken || null,
    isAuthenticated: !!initialToken,
    justLoggedIn: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      state.justLoggedIn = true;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    startChecking: (state) => {
      state.isChecking = true;
    },

    stopChecking: (state) => {
      state.isChecking = false;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearJustLoggedIn: (state) => {
      state.justLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout, startChecking, stopChecking, clearJustLoggedIn, setUser } =
  authSlice.actions;

export default authSlice.reducer;
