import api from '../../services/api';
import { loginSuccess, logout, setUser, startChecking, stopChecking } from '../slices/authSlice';
import { showSnackbar } from '../slices/uiSlice';

export const SignIn = (email = '', password = '') => {
  return async (dispatch) => {
    try {
      dispatch(startChecking());
      dispatch(showSnackbar({msg:"Cargando...", severity:"info"}))
      const res = await api.post('/auth/login', { email, password });
      dispatch(loginSuccess(res.data));
      dispatch(showSnackbar({ msg: 'Inicio de sesión exitoso', severity: 'success' }));
    } catch (error) {
      dispatch(
        showSnackbar({
          msg: error.response?.data?.message || error.message,
          severity: 'error',
        })
      );
    } finally {
      dispatch(stopChecking());
    }
  };
};

export const register = (name = '', email = '', password = '', role = '') => {
  return async (dispatch) => {
    try {
      dispatch(startChecking());
      dispatch(showSnackbar({msg:"Cargando...", severity:"info"}))
      const res = await api.post('/auth/register', { name, email, password, role });
      dispatch(loginSuccess(res.data));
      dispatch(showSnackbar({msg:"Registro exitoso",severity:"success"}))
    } catch (error) {
      dispatch(showSnackbar({
        msg:error.response?.data?.message || error.message,
        severity: "error"
      }))

      showSnackbar(false);
    } finally {
      dispatch(stopChecking());
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
