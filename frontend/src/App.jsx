import { useEffect } from 'react';
import { AppRouter } from './routes/AppRouter';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/thunks/authThunks';

export const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    
    const token=localStorage.getItem("token")
    if (token){
      dispatch(loadUser())
    }
  },[])
  return (
    <>
      <AppRouter />
    </>
  );
};
