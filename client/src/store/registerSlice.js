import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {}

};

const registerSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {

    },

    extraReducers: ( builder ) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
        })
    }
});

// export  const { showModal, addService } = registerSlice.actions;


export default registerSlice.reducer;



// Thunks

export const registerUser = createAsyncThunk( 'register' , async (payload) => {
    console.log({payload})
    const res = await fetch(process.env.REACT_APP_API_URL + "/api/register", {
        method: 'POST',
        body: payload.payload
    });
    const data = await res.json();

    return data;
})

