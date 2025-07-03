import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { useState } from "react"
import api from "../services/api"
import { loginSuccess, startChecking, stopChecking } from "../redux/slices/authSlice"
import { Alert, Box, Button, Container, Snackbar, TextField, Typography, useTheme } from "@mui/material"

const initialForm = {
    email: "",
    password: ""
}
export const LoginPage = () => {
    const theme = useTheme()
    const {isChecking } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const { email, password, onInputChange } = useForm(initialForm);
    const [error, setError] = useState("");
    const [openSnack, setOpenSnack] = useState(false);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setError("");

        if (!email || !password) {
            return setError("Llene todos los campos");
        }

        try {
            dispatch(startChecking())
            const res = await api.post("/auth/login", { email, password });
            dispatch(loginSuccess(res.data));
            dispatch(stopChecking())
            setOpenSnack(true)


        } catch (error) {
            setError(error.response?.data?.message || error.message)
            dispatch(stopChecking())
        }

    }

    const handleSnackClose = () => {
        setOpenSnack(false)
        //navigate("/dashboard")
    }

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.primary.main,
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 2

            }}
        >
            <Typography variant="h3" component="h1" align="center" color="#fff" >
                Facturación y Gestión de Smartphones
            </Typography>

            <Container maxWidth="sm" sx={{ mt: 8 }}>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        p: 4,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: '#fff',
                    }}
                >
                    <Typography variant="h4" component="h2" align="center">
                        Iniciar sesión
                    </Typography>



                    <TextField
                        label="Correo electrónico"
                        type="email"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        disabled={isChecking}
                        fullWidth
                    />

                    <TextField
                        label="Contraseña"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                        disabled={isChecking}
                        fullWidth
                    />

                    {error && <Alert severity="error">{error}</Alert>}

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isChecking}
                        sx={{ mt: 1, height: '45px' }}
                        fullWidth
                    >
                        Entrar
                    </Button>
                    <Typography align="right"> ¿No tienes una cuenta? <a href="#">Registrate</a> </Typography>
                </Box>
            </Container>

            <Snackbar
                open={openSnack}
                autoHideDuration={2000}
                onClose={handleSnackClose}
                message="✅ Inicio de sesión exitoso"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        
            />
        </Box>
    )


}