import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearJustLoggedIn } from '../redux/slices/authSlice';


export const Dashboard = () => {
    const dispatch = useDispatch()
    const {justLoggedIn} = useSelector(state=>state.auth)
    const [showSnackbar,setShowSnackbar]=useState(false)

    
    useEffect(()=>{
    
        if (justLoggedIn){
            setShowSnackbar(true)
            dispatch(clearJustLoggedIn())

        }

    },[])

    const handleCloseSnackbar = ()=>{
        setShowSnackbar(false)
    }
    return (
        <>
            <h1>Bienvenido al DashBoard</h1>
            <Snackbar
                autoHideDuration={2000}
                open={showSnackbar}
                onClose={handleCloseSnackbar}
                message="✅ Inicio de sesion exitoso"
                anchorOrigin={{vertical:"top",horizontal:"center"}}
            />
        </>
    )

}
