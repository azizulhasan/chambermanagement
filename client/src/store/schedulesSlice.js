import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
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
        sessionType: 'physical',
        branch: '',
        perSessionLength: 60,
        sessionFee: 0,
        offDay: [],
        timeSlots: [],
        user: '',
    },
    status: STATUSES.IDLE,
    isModalActive: false,
    SCHEDULE_HEADERS: [
        {
            prop: 'branchName',
            title: 'Branch Name',
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
            prop: 'sessionFee',
            title: 'Session Fee',
        },
        {
            prop: 'offDay',
            title: 'Off Day',
        }
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
                sessionType: 'physical',
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
            state.schedules = action.payload ?? [];
        });

        builder.addCase(saveSchedule.fulfilled, (state, action) => {
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
 * This function will use userId to add consultantName to the schedules and other data from id.
 */
async function addExtraData(data) {
    for (let i = 0; i < data.length; i++) {
        const consultantId = data[i].user;
        const consultant = await fetch(
            process.env.REACT_APP_API_URL + `/api/users/${consultantId}`
        );
        const consultantData = await consultant.json();
        data[i].consultantName = consultantData.name;
        const branch = await fetch(
            process.env.REACT_APP_API_URL + `/api/branches/${data[i].branch}`
        );
        const branchData = await branch.json();

        data[i].branchName = branchData.name ?? 'Online';
    }

    return data;
}

// Thunks

/**
 * Get all schedules in dashboard
 */
export const fetchSchedules = createAsyncThunk('schedules', async () => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/api/schedules');
    const data = await res.json();

    await addExtraData(data.data);
    return data.data;
});
/**
 * Get a single schedule.
 */
export const fetchSingleSchedule = createAsyncThunk(
    'schedules/singleSchedule',
    async (payload) => {
        return fetchData(payload)
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
        await addExtraData(data);

        return data;
    }
);
/**
 * Add a schedule from dashboard.
 */
export const saveSchedule = createAsyncThunk(
    'saveSchedule',
    async (payload) => {
        let data = await fetchData(payload)

        await addExtraData(data)

        return data
    }
);
/**
 * Update schedules details
 */
export const updateSchedule = createAsyncThunk(
    'updateSchedule',
    async (payload) => {
        let data = await fetchData(payload)

        await addExtraData(data)

        return data
    }
);
