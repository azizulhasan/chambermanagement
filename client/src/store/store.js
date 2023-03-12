import { configureStore } from '@reduxjs/toolkit';
import serviceSlice from './serviceSlice';
import usersSlice from './usersSlice';
import schedulessSlice from './schedulesSlice';
import commonDataSlice from './commonDataSlice';

const store = configureStore({
    reducer: {
        services: serviceSlice,
        users: usersSlice, // manage users and add team members
        schedules: schedulessSlice, // manage users and add team members
        common: commonDataSlice, // manage users and add team members
    },
});

export default store;
