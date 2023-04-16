import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import serviceSlice from './serviceSlice';
import branchesSlice from './branchesSlice';
import usersSlice from './usersSlice';
import schedulessSlice from './schedulesSlice';
import commonDataSlice from './commonDataSlice';
import userSchedules from './userScheduleSlice';
import paymentSlice from './paymentSlice';


const store = configureStore({
    reducer: {
        services: serviceSlice, // mange services
        branches: branchesSlice, // mange branches
        users: usersSlice, // manage users and add team members
        schedules: schedulessSlice, // manage doctor schedules
        common: commonDataSlice, // manage common data
        userSchedules: userSchedules, // manage user schedules
        payment: paymentSlice, // manage payment


    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),

});

export default store;
