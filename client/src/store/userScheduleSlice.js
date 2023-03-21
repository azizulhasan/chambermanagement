import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { convertUTCDateToLocalDate } from '../utilities/timeUtilities';
import { database } from '.././database';
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
    dashboardTableHeaders: [],
    dashboardTableBody: [],
    registerUserSchedule: {
        1: {
            session_name: '',
            doctor_id: '',
            session_date: '',
            session_time: '',
        },
        2: {
            name: '',
            email: '',
            phone: '',
        },
        3: {
            paymentMethod: '',
        },
    },
    currentSlide: {},
    days: [
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wensday',
        'Thursday',
        'Friday',
    ],
    singleUserSchedules: {
        branch: '',
        perSessionLength: 60,
        offDay: [],
        timeSlots: [],
        user: '',
    },
    status: STATUSES.IDLE,
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
        builder.addCase(fetchUserSchedules.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        });

        builder.addCase(fetchUserSchedules.fulfilled, (state, action) => {
            console.log({ payload: action.payload });
            state.userSchedules = action.payload;

            state.dashboardTableHeaders = [
                { prop: 'session_name', title: 'Session' },
                { prop: 'doctor_name', title: 'Doctor' },
                { prop: 'patient_details', title: 'Patient Details' },
                { prop: 'session_time', title: 'Scheduled At' },
                { prop: 'status', title: 'Status' },
            ];
            state.dashboardTableBody = action.payload.map((userSchedule) => {
                let doctor_name = userSchedule.consultantData.name;
                let PatientDetails = () => (
                    <span>
                        {[
                            { title: 'Name', desc: userSchedule.name },
                            { title: 'Email', desc: userSchedule.email },
                            { title: 'Password', desc: userSchedule.phone },
                        ].map((item) => (
                            <span key={item}>
                                {item.title}: {item.desc}
                                <br />
                            </span>
                        ))}
                    </span>
                );
                let Status = () => (
                    <span
                        style={{
                            padding: '4px 8px',
                            backgroundColor: `${database.basic.themeColor}`,
                            opacity: 0.8,
                            color: 'white',
                            borderRadius: '4px',
                        }}
                    >
                        Pending
                    </span>
                );
                // console.log({ patient_details });
                return {
                    session_name: userSchedule.session_name,
                    doctor_name: doctor_name,
                    patient_details: <PatientDetails />,
                    session_time: userSchedule.session_time,
                    status: <Status />,
                };
            });
            state.status = STATUSES.IDLE;
        });
        builder.addCase(fetchUserSchedules.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        });
        builder.addCase(fetchSingleSchedule.fulfilled, (state, action) => {
            state.singleSchedule = action.payload;
        });

        builder.addCase(deleteSchedule.fulfilled, (state, action) => {
            state.schedules = action.payload;
        });

        builder.addCase(saveUserSchedule.fulfilled, (state, action) => {
            console.log(action.payload.data);
            state.schedules = action.payload;
            state.isModalActive = false;
        });

        builder.addCase(updateSchedule.fulfilled, (state, action) => {
            state.schedules = action.payload;
            state.isModalActive = false;
        });
        builder.addCase(updateCurrentSlide.fulfilled, (state, action) => {
            state.currentSlide = action.payload;
        });
    },
});

export let { showModal, addSchedule, updateScheduleState } =
    userSchedules.actions;

export default userSchedules.reducer;

// Thunks

/**
 * Get all schedules in dashboard
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
 * Get a single schedule.
 */
export const fetchSingleSchedule = createAsyncThunk(
    'schedules/singleSchedule',
    async (payload) => {
        console.log({ payload });
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
export const saveUserSchedule = createAsyncThunk(
    'saveUserSchedule',
    async (payload) => {
        return fetchData(payload);
    }
);

//Update schedules details
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

// update current slide
export const updateCurrentSlide = createAsyncThunk(
    'updateCurrentSlide',
    (payload) => {
        return payload;
    }
);
