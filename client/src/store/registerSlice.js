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
            // const navigate = useNavigate();
            console.log(action)
            if( action.payload.status ) {
                // navigate('/login')
                window.location.href = '/login'
            }
        })
    }
});

// export  const { showModal, addService } = registerSlice.actions;


export default registerSlice.reducer;



// Thunks

export const registerUser = createAsyncThunk( 'register' , async (payload) => {
    const res = await fetch(process.env.REACT_APP_API_URL + "/api/register",
   {
     headers: {
      "Content-Type": "application/json",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: payload, // body data type must match "Content-Type" header
   });
    const data = await res.json();

    return data;
})

