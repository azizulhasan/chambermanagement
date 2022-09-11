import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsReducer from "./productSlice";
import serviceSlice from "./serviceSlice";


const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        services: serviceSlice,
    }
})

export default store;