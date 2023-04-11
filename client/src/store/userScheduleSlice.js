import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { convertUTCDateToLocalDate } from '../utilities/timeUtilities';
import { defaultUserScheduleData } from '.././data/database';
import {
    addUserData,
    fetchData,
    getLocalStorage,
    setLocalStorage,
    setSessionStorage,
} from '../utilities/utilities';

export const STATUSES = {
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
};

let initialState = {
    userSchedules: [],
    registerUserSchedule: defaultUserScheduleData,
    defaultSchedule: defaultUserScheduleData,
    currentSlide: {},
    singleUserSchedule: {
        branch: '',
        perSessionLength: 60,
        offDay: [],
        timeSlots: [],
        user: '',
    },
    status: STATUSES.IDLE,
    currentDoctorSchedules: [],
    frontUserSingleSchedule: {},
    isNewSchedule: true,
    newSessionNotice: '',
};

let userSchedules = createSlice({
    name: 'userSchedules',
    initialState,
    reducers: {
        showModal(state, action) {
            state.isModalActive = action.payload;
        },
        addSchedule(state, action) {
            state.isModalActive = true;
            state.singleUserSchedule = {
                branch: '',
                perSessionLength: 60,
                offDay: [],
                timeSlots: [],
                user: '',
            };
        },
        updateUserSchedulestate(state, action) {
            if (Array.isArray(action.payload)) {
                state.singleUserSchedule.timeSlots = action.payload;
            } else {
                let name = Object.keys(action.payload)[0];
                if (name == 'offDay') {
                    state.singleUserSchedule[name] = [
                        ...new Set(action.payload[name]),
                    ];
                } else {
                    state.singleUserSchedule[name] = action.payload[name];
                }
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchUserSchedules.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        });

        builder.addCase(fetchUserSchedules.fulfilled, (state, action) => {
            state.userSchedules = action.payload;
            state.status = STATUSES.IDLE;
        });
        builder.addCase(fetchUserSchedules.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        });
        builder.addCase(fetchSingleUserSchedule.fulfilled, (state, action) => {
            state.singleUserSchedule = action.payload;
        });

        builder.addCase(
            clearRegisterUserSchedule.fulfilled,
            (state, action) => {
                state.registerUserSchedule = action.payload;
                state.isNewSchedule = true;
            }
        );
        builder.addCase(updateRegisterSchedule.fulfilled, (state, action) => {
            state.isNewSchedule = false;
            state.registerUserSchedule = action.payload;
        });

        builder.addCase(deleteSchedule.fulfilled, (state, action) => {
            state.userSchedules = action.payload;
        });

        builder.addCase(saveUserSchedule.fulfilled, (state, action) => {
            state.frontUserSingleSchedule = action.payload.data;
        });
        builder.addCase(clearUserSchedule.fulfilled, (state, action) => {
            state.frontUserSingleSchedule = {};
        });

        builder.addCase(updateNewSessionNotice.fulfilled, (state, action) => {
            state.newSessionNotice = action.payload;
        });

        builder
            .addCase(fetchDoctorSchedules.pending, (state, action) => {
                state.status = false;
            })
            .addCase(fetchDoctorSchedules.fulfilled, (state, action) => {
                state.currentDoctorSchedules = action.payload.data;
                state.status = true;
            });

        builder.addCase(updateSchedule.fulfilled, (state, action) => {
            state.currentDoctorSchedules = action.payload;
        });
    },
});

export let { showModal, addSchedule, updateUserSchedulestate } =
    userSchedules.actions;

export default userSchedules.reducer;

// Thunks

/**
 * Get all userschedules in dashboard
 */
export const fetchUserSchedules = createAsyncThunk('schedules', async () => {
    const res = await fetch(
        process.env.REACT_APP_API_URL + '/api/userSchedule'
    );
    const data = await res.json();

    await addUserData(data.data, 'doctor_id', 'consultantData');

    return data.data;
});
/**
 * Get doctor schedules in appointment page
 */
export const fetchDoctorSchedules = createAsyncThunk(
    'fetchDoctorSchedules',
    async (payload) => {
        return fetchData(payload);
    }
);
/**
 * Get a single schedule.
 */
export const fetchSingleUserSchedule = createAsyncThunk(
    'userschedules/singleUserSchedule',
    async (payload) => {
        const id = payload;
        const res = await fetch(
            process.env.REACT_APP_API_URL + `/api/userschedules/${id}`
        );
        const data = await res.json();
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
            process.env.REACT_APP_API_URL + '/api/userschedules/' + payload,
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
export const saveUserSchedule = createAsyncThunk(
    'saveUserSchedule',
    async (payload) => {
        return fetchData(payload);
    }
);

/**
 * clear user single schedule.
 */
export const clearUserSchedule = createAsyncThunk(
    'clearUserSchedule',
    async (payload) => {
        return payload;
    }
);

/**
 * clear clearRegisterUserSchedule
 */
export const clearRegisterUserSchedule = createAsyncThunk(
    'clearRegisterUserSchedule',
    async (payload) => {
        return payload;
    }
);

/**
 * update updateRegisterSchedule
 */
export const updateRegisterSchedule = createAsyncThunk(
    'updateRegisterSchedule',
    (payload) => {
        return payload;
    }
);

//Update userschedules details
export const updateSchedule = createAsyncThunk(
    'updateSchedule',
    async (payload) => {
        console.log(payload[1]);
        const res = await fetch(
            process.env.REACT_APP_API_URL + `/api/userschedules/${payload[0]}`,
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

// update current slide
export const updateNewSessionNotice = createAsyncThunk(
    'updateNewSessionNotice',
    (payload) => {
        return payload;
    }
);
