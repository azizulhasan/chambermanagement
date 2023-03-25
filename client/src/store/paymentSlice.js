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


        builder.addCase(proceed_to_pay.fulfilled, (state, action) => {
            window.open(action.payload.url, '_blank')
        });
    },
});


export default paymentSlice.reducer;


/**
 * Add a schedule from dashboard.
 */
export const proceed_to_pay = createAsyncThunk(
    'proceed_to_pay',
    async (payload) => {
        return fetchData(payload);
    }
);
