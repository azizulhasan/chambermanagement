import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const initialState = {
    services: [],
    singleService: {},
    status: STATUSES.IDLE,
    isModalActive: false,
    SERVICE_HEADERS: [
        {
            prop: 'title',
            title: 'Title',
        },
        {
            prop: 'image',
            title: 'Image',
        },
    ],
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        showModal(state, action) {
            state.isModalActive = action.payload;
        },
        addService(state, action) {
            state.isModalActive = true;
            state.singleService = {};
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchServices.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        });

        builder.addCase(fetchServices.fulfilled, (state, action) => {
            state.services = action.payload;
            state.status = STATUSES.IDLE;
        });
        builder.addCase(fetchServices.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        });
        builder.addCase(fetchSingleService.fulfilled, (state, action) => {
            state.singleService = action.payload;
        });

        builder.addCase(deleteService.fulfilled, (state, action) => {
            state.services = action.payload;
        });

        builder.addCase(saveService.fulfilled, (state, action) => {
            state.services = action.payload;
            state.isModalActive = false;
        });

        builder.addCase(updateService.fulfilled, (state, action) => {
            state.services = action.payload;
            state.isModalActive = false;
        });
    },
});

export const { showModal, addService } = serviceSlice.actions;

export default serviceSlice.reducer;

// Thunks

export const fetchServices = createAsyncThunk('services', async () => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/api/services');
    const data = await res.json();

    for (let i = 0; i < data.data.length; i++) {
        data.data[
            i
        ].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${data.data[i].image}">`;
    }

    return data.data;
});

export const fetchSingleService = createAsyncThunk(
    'services/singleService',
    async (payload) => {
        const id = payload;
        const res = await fetch(
            process.env.REACT_APP_API_URL + `/api/services/${id}`
        );
        const data = await res.json();

        return data;
    }
);

export const deleteService = createAsyncThunk(
    'deleteService',
    async (payload) => {
        const res = await fetch(
            process.env.REACT_APP_API_URL + '/api/services/' + payload,
            { method: 'DELETE' }
        );
        const data = await res.json();
        for (let i = 0; i < data.data.length; i++) {
            data.data[
                i
            ].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${data.data[i].image}">`;
        }

        return data.data;
    }
);

export const saveService = createAsyncThunk('saveService', async (payload) => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/api/services', {
        method: 'POST',
        body: payload,
    });
    const data = await res.json();
    for (let i = 0; i < data.data.length; i++) {
        data.data[
            i
        ].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${data.data[i].image}">`;
    }
    return data.data;
});

export const updateService = createAsyncThunk(
    'updateService',
    async (payload) => {
        const res = await fetch(
            process.env.REACT_APP_API_URL + '/api/services',
            {
                method: 'PUT',
                body: payload,
            }
        );
        const data = await res.json();
        for (let i = 0; i < data.data.length; i++) {
            data.data[
                i
            ].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${data.data[i].image}">`;
        }
        return data.data;
    }
);
