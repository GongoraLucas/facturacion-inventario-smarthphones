import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from '../redux/slices/uiSlice';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.ui);
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={2500}
      onClose={() => dispatch(hideSnackbar())}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={snackbar.severity} role="alert">
        {snackbar.msg}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
