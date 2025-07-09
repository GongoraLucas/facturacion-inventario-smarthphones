import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../redux/thunks/authThunks';
import { logout } from '../redux/slices/authSlice';

export const AuthInit = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser());
    }else{
      dispatch(logout())
    }
  }, [dispatch]);

  return children;
};
