import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    addUserData,
    fetchData,
    getLocalStorage,
    setLocalStorage,
    setSessionStorage,
} from '../utilities/utilities';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

let initialState = {
    userSchedules: [],
};

let paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {


        builder.addCase(proceedToPay.fulfilled, (state, action) => {
            state.isModalActive = false;
        });
    },
});


export default paymentSlice.reducer;


/**
 * Add a schedule from dashboard.
 */
export const proceedToPay = createAsyncThunk(
    'proceedToPay',
    async (payload) => {
        return fetchData(payload);
    }
);
