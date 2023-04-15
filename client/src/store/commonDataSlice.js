import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    showModal: false,
    isRowAdded: false,
    addNew: false,
    status: 'idle',
    showNotice: false,
    noticeMessage: '',
    noticeDelay: 2000,
    themeColor: 'rgb(103, 147, 75)',
    errorMessages: {},
    isFormSubmitted: false
};

export const commonDataSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(openModal.pending, (state) => { })
            .addCase(openModal.fulfilled, (state, action) => {
                state.status = 'idle';
                state.showModal = action.payload.displayModal;
                if (action.payload.hasOwnProperty('addNew')) {
                    state.addNew = action.payload.addNew;
                }
            });
        builder
            .addCase(displayNotice.pending, (state) => { })
            .addCase(displayNotice.fulfilled, (state, action) => {
                state.showNotice = !!action.payload;
                state.noticeMessage = action.payload;
            });
        builder
            .addCase(rowAdded.pending, (state) => { })
            .addCase(rowAdded.fulfilled, (state, action) => {
                state.isRowAdded = action.payload;
            });

        builder
            .addCase(updateErrMessages.pending, (state) => { })
            .addCase(updateErrMessages.fulfilled, (state, action) => {
                state.errorMessages = action.payload;
            });
        builder
            .addCase(formSubmitted.pending, (state) => { })
            .addCase(formSubmitted.fulfilled, (state, action) => {
                state.isFormSubmitted = action.payload;
            });
    },
});

export const openModal = createAsyncThunk('openModal', async (payload) => {
    return await payload;
});

export const displayNotice = createAsyncThunk('showNotice', async (payload) => {
    return await payload;
});

export const rowAdded = createAsyncThunk('rowAdded', async (payload) => {
    return await payload;
});

export const updateErrMessages = createAsyncThunk('updateErrMessages', async (payload) => {
    return payload;
});

export const formSubmitted = createAsyncThunk('formSubmitted', async (payload) => {
    return payload;
});

export default commonDataSlice.reducer;
