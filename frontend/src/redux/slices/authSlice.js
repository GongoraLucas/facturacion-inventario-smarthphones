import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        isChecking:false,
        token:initialToken || null,
        isAuthenticated: !!initialToken,
    },
    reducers:{

        loginSuccess: (state,action)=>{
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
            localStorage.setItem("token",action.payload.token)
        
        },

        startChecking: (state,action)=>{
            state.isChecking = true
        },

        stopChecking: (state,action)=>{
            state.isChecking = false
        },

        logout: (state,action) =>{
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem("token")
        }
    }

})

export const {
    loginSuccess,
    logout,
    startChecking,
    stopChecking

} = authSlice.actions

export default authSlice.reducer