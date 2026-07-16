"use client"

import { createSlice } from "@reduxjs/toolkit"
import {
    registerUser,
    loginUser,
    logoutUser,
} from "./user-action"
import Cookies from 'js-cookie';
import { UserState } from "./user-type";

const initialState: UserState = {
    user: null,
    loading: true,
    token: '',
    error: null,
    status: 'pending'
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.status = "pending";
            Cookies.remove("token")
        },
        resetAuthError: (state) => {
            state.error = null;
            state.status = "pending"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.status = "pending"
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access_token
                state.user = action.payload.user;
                state.error = null;
                state.status = "succeed";
                Cookies.set("token", action.payload.access_token)
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.user = null;
                state.error = action.payload as string;
                Cookies.remove("token")
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.status = "pending"
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access_token
                state.user = action.payload.user;
                state.status = "succeed";
                state.error = null;
                Cookies.set("token", action.payload.access_token)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.error = action.payload as string;
                Cookies.remove("token")
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
                state.token = ''
                state.error = null;
                state.status = "pending";
                Cookies.remove("token")
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'rejected'
                Cookies.remove("token");
                state.error = action.payload as string
            })
    }
})

export const { resetAuth, resetAuthError } = authSlice.actions;
export default authSlice.reducer
