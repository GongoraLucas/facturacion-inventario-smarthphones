import api from '../../services/api';
import { loginSuccess, logout, setUser, startChecking, stopChecking } from '../slices/authSlice';

export const SignIn = (email = '', password = '', setError = () => {}, showSnackbar = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(startChecking());
      showSnackbar(true);
      const res = await api.post('/auth/login', { email, password });
      dispatch(loginSuccess(res.data));
      dispatch(stopChecking());
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      dispatch(stopChecking());
      showSnackbar(false);
    }
  };
};

export const register = (
  name = '',
  email = '',
  password = '',
  role = '',
  setError = () => {},
  showSnackbar = () => {}
) => {
  return async (dispatch) => {
    try {
      dispatch(startChecking());
      showSnackbar(true);
      const res = await api.post('/auth/register', { name, email, password, role });
      dispatch(loginSuccess(res.data));
      dispatch(stopChecking());
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      dispatch(stopChecking());
      showSnackbar(false);
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    try {
      dispatch(startChecking());
      const res = await api.get('/auth/profile');
      dispatch(setUser(res.data));
    } catch (error) {
      dispatch(logout());
    } finally {
      dispatch(stopChecking());
    }
  };
};
