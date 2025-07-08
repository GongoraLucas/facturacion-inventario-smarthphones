import { useEffect } from 'react';
import { AppRouter } from './routes/AppRouter';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/thunks/authThunks';

export const App = () => {
  return (
    <>
      <AppRouter />
    </>
  );
};
