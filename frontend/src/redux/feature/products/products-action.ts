import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { ProductType } from './products-type';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8090";

export const fetchProducts = createAsyncThunk<
    { message: string, data: { data: ProductType[], totalDocuments: number } },
    { page?: number },
    { state: RootState }
>(
    "product/listing",
    async (
        { page = 0 },
        { getState, rejectWithValue }
    ) => {
        try {
            const token = getState().userReducer.token || "";
            const res = await fetch(`${BACKEND_URL}/product?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }

            return result;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);