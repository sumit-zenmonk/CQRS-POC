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

            return { ...result, page: page };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk<
    { message: string, product_uuid: string },
    { product_uuid: string },
    { state: RootState }
>(
    "product/delete",
    async (
        { product_uuid },
        { getState, rejectWithValue }
    ) => {
        try {
            const token = getState().userReducer.token || "";

            const res = await fetch(`${BACKEND_URL}/product/${product_uuid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }

            return { ...result, product_uuid };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);