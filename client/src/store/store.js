import {configureStore} from "@reduxjs/toolkit";
import serviceSlice from "./serviceSlice";
import registerSlice from "./registerSlice";


const store = configureStore({
    reducer: {
        services: serviceSlice,
        user: registerSlice,
    }
})

export default store;