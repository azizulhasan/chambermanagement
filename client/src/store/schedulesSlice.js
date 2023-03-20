import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
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
    schedules: [],
    options: [
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wensday',
        'Thursday',
        'Friday',
    ],
    singleSchedule: {
        branch: '',
        perSessionLength: 60,
        offDay: [],
        timeSlots: [],
        user: '',
    },
    status: STATUSES.IDLE,
    isModalActive: false,
    SCHEDULE_HEADERS: [
        {
            prop: 'branch',
            title: 'Branch',
        },
        {
            prop: 'consultantName',
            title: 'Consultant',
        },
        {
            prop: 'perSessionLength',
            title: 'Session Length',
        },
        {
            prop: 'offDay',
            title: 'Off Day',
        },
        {
            prop: 'updatedAt',
            title: 'Last Updated',
        },
    ],
    SCHEDULE_ROLES: ['SCHEDULE', 'ADMIN', 'DOCTOR'],
};

let schedulesSlice = createSlice({
    name: 'schedules',
    initialState,
    reducers: {
        showModal(state, action) {
            state.isModalActive = action.payload;
        },
        addSchedule(state, action) {
            state.isModalActive = true;
            state.singleSchedule = {
                branch: '',
                perSessionLength: 60,
                offDay: [],
                timeSlots: [],
                user: '',
            };
        },
        updateScheduleState(state, action) {
            if (Array.isArray(action.payload)) {
                state.singleSchedule.timeSlots = action.payload;
            } else {
                let name = Object.keys(action.payload)[0];
                if (name == 'offDay') {
                    state.singleSchedule[name] = [
                        ...new Set(action.payload[name]),
                    ];
                } else {
                    state.singleSchedule[name] = action.payload[name];
                }
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchSchedules.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        });

        builder.addCase(fetchSchedules.fulfilled, (state, action) => {
            state.schedules = action.payload;
            state.status = STATUSES.IDLE;
        });
        builder.addCase(fetchSchedules.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        });
        builder.addCase(fetchSingleSchedule.fulfilled, (state, action) => {
            state.singleSchedule = action.payload;
        });

        builder.addCase(deleteSchedule.fulfilled, (state, action) => {
            state.schedules = action.payload;
        });

        builder.addCase(saveSchedule.fulfilled, (state, action) => {
            console.log(action.payload.data);
            state.schedules = action.payload;
            state.isModalActive = false;
        });

        builder.addCase(updateSchedule.fulfilled, (state, action) => {
            state.schedules = action.payload;
            state.isModalActive = false;
        });
    },
});

export let { showModal, addSchedule, updateScheduleState } =
    schedulesSlice.actions;

export default schedulesSlice.reducer;

/**
 * This function will use userId to add consultantName to the schedules
 */
async function addConsultantName(data) {
    for (let i = 0; i < data.data.length; i++) {
        const consultantId = data.data[i].user;
        const consultant = await fetch(
            process.env.REACT_APP_API_URL + `/api/users/${consultantId}`
        );
        const consultantData = await consultant.json();
        data.data[i].consultantName = consultantData.name;
    }
}

// Thunks

/**
 * Get all schedules in dashboard
 */
export const fetchSchedules = createAsyncThunk('schedules', async () => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/api/schedules');
    const data = await res.json();

    await addConsultantName(data);

    for (let i = 0; i < data.data.length; i++) {
        const consultantId = data.data[i].user;
        const consultant = await fetch(
            process.env.REACT_APP_API_URL + `/api/users/${consultantId}`
        );
        const consultantData = await consultant.json();
        data.data[i].consultantName = consultantData.name;
    }

    return data.data;
});
/**
 * Get a single schedule.
 */
export const fetchSingleSchedule = createAsyncThunk(
    'schedules/singleSchedule',
    async (payload) => {
        const id = payload;
        const res = await fetch(
            process.env.REACT_APP_API_URL + `/api/schedules/${id}`
        );
        const data = await res.json();

        console.log({ data });

        return data;
    }
);
/**
 * Delete a schedule.
 */
export const deleteSchedule = createAsyncThunk(
    'deleteSchedule',
    async (payload) => {
        const res = await fetch(
            process.env.REACT_APP_API_URL + '/api/schedules/' + payload,
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
/**
 * Add a schedule from dashboard.
 */
export const saveSchedule = createAsyncThunk(
    'saveSchedule',
    async (payload) => {
        const res = await fetch(
            process.env.REACT_APP_API_URL + '/api/schedules',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(payload),
            }
        );
        const data = await res.json();

        // await addConsultantName(data);

        return data.data;
    }
);
/**
 * Update schedules details
 */
export const updateSchedule = createAsyncThunk(
    'updateSchedule',
    async (payload) => {
        const res = await fetch(
            process.env.REACT_APP_API_URL + `/api/schedules/${payload[0]}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify(payload[1]),
            }
        );
        const data = await res.json();
        for (let i = 0; i < data.data.length; i++) {
            data.data[
                i
            ].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${data.data[i].image}">`;
        }
        // await addConsultantName(data);

        return data.data;
    }
);
