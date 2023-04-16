import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../utilities/utilities';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});


const initialState = {
    branches: [],
    singleBranch: {},
    status: STATUSES.IDLE,
    isModalActive: false,
    BRANCHE_HEADERS: [
        {
            prop: 'name',
            title: 'Branch Name',
            isFilterable: true,
        },
        {
            prop: 'address',
            title: 'Address',
        },
        {
            prop: 'phone',
            title: 'Phone',
        },
        {
            prop: 'action',
            title: 'Action',
        },
    ],
};

const branchSlice = createSlice({
    name: 'branches',
    initialState,
    reducers: {
        showModal(state, action) {
            state.isModalActive = action.payload;
        },
        addBranch(state, action) {
            state.isModalActive = true;
            state.singleBranch = {};
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchBranches.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        });

        builder.addCase(fetchBranches.fulfilled, (state, action) => {
            console.log(action.payload)
            state.branches = action.payload;
            state.status = STATUSES.IDLE;
        });
        builder.addCase(fetchBranches.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        });
        builder.addCase(fetchSingleBranch.fulfilled, (state, action) => {
            state.singleBranch = action.payload;
        });

        builder.addCase(deleteBranch.fulfilled, (state, action) => {
            state.branches = action.payload;
        });

        builder.addCase(saveBranch.fulfilled, (state, action) => {
            state.branches = action.payload;
            state.isModalActive = false;
        });

        builder.addCase(updateBranch.fulfilled, (state, action) => {
            state.branches = action.payload;
            state.isModalActive = false;
        });
    },
});

export const { showModal, addBranch } = branchSlice.actions;

export default branchSlice.reducer;

// Thunks

export const fetchBranches = createAsyncThunk('branches', async () => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/api/branches');
    const data = await res.json();


    return data.data;
});

export const fetchSingleBranch = createAsyncThunk(
    'branches/singleBranch',
    async (payload) => {
        const id = payload;
        const res = await fetch(
            process.env.REACT_APP_API_URL + `/api/branches/${id}`
        );
        const data = await res.json();

        return data;
    }
);

export const deleteBranch = createAsyncThunk(
    'deleteBranch',
    async (payload) => {
        const res = await fetch(
            process.env.REACT_APP_API_URL + '/api/branches/' + payload,
            { method: 'DELETE' }
        );
        const data = await res.json();

        return data.data;
    }
);

export const saveBranch = createAsyncThunk('saveBranch', async (payload) => {
    return fetchData(payload)
});

export const updateBranch = createAsyncThunk(
    'updateBranch',
    async (payload) => {
        return fetchData(payload)
    }
);
