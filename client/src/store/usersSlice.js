import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getLocalStorage,
    redirectUser,
    setLocalStorage,
    setSessionStorage,
} from '../utilities/utilities';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
    loggedInUser: {}
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

        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload.status) {
                let storage = getLocalStorage(['remember_me']);
                const registeredUser = JSON.stringify(action.payload.data);
                if (storage.remember_me) {
                    localStorage.removeItem('remember_me');
                    setLocalStorage({ user: registeredUser });
                } else {
                    setSessionStorage({ user: registeredUser });
                }
                state.loggedInUser = action.payload.data
            } else {
                alert(action.payload.message);
            }
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            alert(action.payload.message);
        });

        builder.addCase(fetchUsers.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        });

        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = STATUSES.IDLE;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        });
        builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
            state.singleUser = action.payload;
        });

        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.users = action.payload;
        });

        builder.addCase(saveUser.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isModalActive = false;
        });

        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isModalActive = false;
        });
        builder.addCase(logOut.pending, (state, action) => {
            state.users = 'loggingout';

        }).addCase(logOut.fulfilled, (state, action) => {
            state.loggedInUser = {}
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

/**
 * Get all users in dashboard
 */
export const fetchUsers = createAsyncThunk('users', async () => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/api/users');
    const data = await res.json();

    for (let i = 0; i < data.data.length; i++) {
        data.data[
            i
        ].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${data.data[i].image}">`;
    }
    return data.data;
});
/**
 * Get a single user.
 */
export const fetchSingleUser = createAsyncThunk(
    'users/singleUser',
    async (payload) => {
        const id = payload;
        const res = await fetch(
            process.env.REACT_APP_API_URL + `/api/users/${id}`
        );
        const data = await res.json();

        return data;
    }
);
/**
 * Delete a user.
 */
export const deleteUser = createAsyncThunk('deleteUser', async (payload) => {
    const res = await fetch(
        process.env.REACT_APP_API_URL + '/api/users/' + payload,
        { method: 'DELETE' }
    );
    const data = await res.json();
    for (let i = 0; i < data.data.length; i++) {
        data.data[
            i
        ].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${data.data[i].image}">`;
    }

    return data.data;
});
/**
 * Add a user from dashboard.
 */
export const saveUser = createAsyncThunk('saveUser', async (payload) => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/api/users', {
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
/**
 * Update users details
 */
export const updateUser = createAsyncThunk('updateUser', async (payload) => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/api/users', {
        method: 'PUT',
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

/**
 * Update users details
 */
export const logOut = createAsyncThunk('logOut', async (payload) => {
    return await payload;
});
