import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
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
    logout

} = authSlice.actions

export default authSlice.reducer