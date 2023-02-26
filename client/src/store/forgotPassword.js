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

const initialState = {
    users: [],
    singleUser: {},
    status: STATUSES.IDLE,
    isModalActive: false,
    USER_HEADERS: [
        {
            prop: 'name',
            title: 'Name',
        },
        {
            prop: 'email',
            title: 'Email',
        },
        {
            prop: 'phone',
            title: 'Phone',
        },
        {
            prop: 'image',
            title: 'Image',
        },
    ],
    USER_ROLES: ['USER', 'ADMIN', 'DOCTOR'],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        showModal(state, action) {
            state.isModalActive = action.payload;
        },
        addUser(state, action) {
            state.isModalActive = true;
            state.singleUser = {};
        },
    },

    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload.status) {
                window.sessionStorage.setItem(
                    'email',
                    action.payload.data.email
                );
                alert('Registration Successful.');
                window.location.href = '/login';
            } else {
                alert(action.payload.message);
            }
        });
    },
});

export const { showModal, addUser } = usersSlice.actions;

export default usersSlice.reducer;

// Thunks
/**
 * Register a user from frontend
 */
export const registerUser = createAsyncThunk('register', async (payload) => {
    const res = await fetch(
        process.env.REACT_APP_API_URL + '/api/users/register',
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: payload, // body data type must match "Content-Type" header
        }
    );
    const data = await res.json();
    return data;
});

/**
 * Login a user
 */
export const loginUser = createAsyncThunk('login', async (payload) => {
    const res = await fetch(
        process.env.REACT_APP_API_URL + '/api/users/login',
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: payload, // body data type must match "Content-Type" header
        }
    );
    const data = await res.json();
    return data;
});
