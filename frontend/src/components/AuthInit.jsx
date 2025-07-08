import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../redux/thunks/authThunks';

export const AuthInit = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return children;
};
