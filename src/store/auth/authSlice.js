import { createSlice } from '@reduxjs/toolkit';

const status = {
    checking: "checking",
    notAuthenticated: "not-authenticated",
    authenticated: "authenticated"
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: status.checking,
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        login: (state, action) => {
            state.status = status.authenticated,
            state.uid = action.payload.uid,
            state.displayName = action.payload.displayName,
            state.email = action.payload.email,
            state.photoURL = action.payload.photoURL
            state.errorMessage = action.payload.errorMessage
        },
        logout: (state, action) => {
            state.status = status.notAuthenticated,
            state.uid = null,
            state.email = null,
            state.displayName = null,
            state.photoURL = null,
            state.errorMessage = action.payload
        },
        checkingCredentials: (state) => {
            state.status = status.checking
        }
    }
});
export const { login, logout, checkingCredentials } = authSlice.actions;