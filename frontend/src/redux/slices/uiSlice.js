import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name:'ui',
    initialState:{
        snackbar:{
            open:false,
            msg:"",
            severity:"info", // severity: 'success' | 'error' | 'info' | 'warning'
        }
    },
    reducers:{
        showSnackbar: (state,action)=>{
            state.snackbar = {
                open:true,
                ... action.payload

            }
        },
        hideSnackbar: (state,action)=>{
            state.snackbar.open = false
        }
        
    }
})

export const {showSnackbar,hideSnackbar} = uiSlice.actions

export default uiSlice.reducer