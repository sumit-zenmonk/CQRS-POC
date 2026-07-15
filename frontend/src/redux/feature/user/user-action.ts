"use client"

import { createAsyncThunk } from "@reduxjs/toolkit"
import { RegisterSchemaType } from "@/schemas/register"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8090";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data: RegisterSchemaType, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BACKEND_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data)
            })

            const result = await res.json()

            if (!res.ok) throw new Error(result.message)

            return result
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (
        { text, password }: { text: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`${BACKEND_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ text, password })
            })

            const result = await res.json()

            if (!res.ok) throw new Error(result.message)

            return result
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const { persistor } = await import("@/redux/store");
            await persistor.purge();
            return null
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)