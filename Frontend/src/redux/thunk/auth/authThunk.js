import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/register", data);
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Register failed"
            );
        }
    }
);