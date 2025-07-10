import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from '../redux/slices/uiSlice';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.ui);

  if (!snackbar.msg) return null;

  const handleClose = () => dispatch(hideSnackbar());

  const handleAccept = () => {
    snackbar?.onAccept?.(); // ejecuta onAccept si existe
    handleClose();
  };

  const handleCancel = () => {
    snackbar?.onCancel?.(); // ejecuta onCancel si existe
    handleClose();
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.confirmation ? null : 2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity={snackbar.severity}
        role="alert"
        action={
          snackbar.confirmation && (
            <>
              <Button color="inherit" size="small" onClick={handleAccept}>
                ACEPTAR
              </Button>
              <Button color="inherit" size="small" onClick={handleCancel}>
                CANCELAR
              </Button>
            </>
          )
        }
        onClose={handleClose}
      >
        {snackbar.msg}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
