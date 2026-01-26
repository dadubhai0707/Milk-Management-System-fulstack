import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../thunk/auth/authThunk";
// access refresh token ne localstorage ma karva nu bakee 6 
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: null,
        isAuthenticated: false
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        }
    },

    extraReducers: (builder) => {

    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;