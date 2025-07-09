import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import {  LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { logout, startChecking, stopChecking } from '../redux/slices/authSlice'


export const Navbar = ({ drawerWidth = 240, handleDrawerToggle}) => {
    const dispatch = useDispatch()
    const onLogout = ()=>{
        dispatch(startChecking())
        dispatch(logout())
        dispatch(stopChecking())
    }
    return (
        <AppBar
            position='fixed'
            sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } , ml:{sm:`${drawerWidth}px`}}}
        >
            <Toolbar>
                <IconButton color='inherit' sx={{display:{sm:"none"}, mr:2}} onClick={handleDrawerToggle}>
                    <MenuOutlined />
                </IconButton>
                <Grid container  direction="row" justifyContent="space-between" alignItems="center" sx={{flexGrow:1}}> 
                    <Typography variant='h5' component="div" noWrap>Smartphones</Typography>
                    <IconButton onClick={onLogout} color='error' >
                        <LogoutOutlined/>
                    </IconButton>

                </Grid>
            </Toolbar>
        </AppBar>
    )
}
