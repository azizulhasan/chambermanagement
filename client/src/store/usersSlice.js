import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const STATUSES = Object.freeze( {
    IDLE: 'idle',
    ERROR:  'error',
    LOADING: 'loading'

})

const initialState = {
    users: [],
    singleUser: {},
    status:  STATUSES.IDLE,
    isModalActive: false,
    SERVICE_HEADERS: [
    {
      prop: "title",
      title: "Title",
    },
    {
      prop: "image",
      title: "Image",
    },
  ]

};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        showModal( state, action ){
            state.isModalActive = action.payload;
        },
        addUser ( state, action ) {
            state.isModalActive = true;
            state.singleUser = {}
        }

    },

    extraReducers: ( builder ) => {
        builder.addCase(fetchUsers.pending , (state, action ) => {
                state.status = STATUSES.LOADING
            })

        builder.addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.status = STATUSES.IDLE;
            })
            builder.addCase(fetchUsers.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            builder.addCase(fetchSingleUser.fulfilled, (state, action) =>{
                state.singleUser = action.payload
                state.isModalActive = true;
            })

            builder.addCase( deleteUser.fulfilled, ( state, action ) => {
                state.users = action.payload
            })

            builder.addCase( saveUser.fulfilled, ( state, action ) => {
                state.users      = action.payload
                state.isModalActive = false;
            })

            builder.addCase( updateUser.fulfilled, ( state, action ) => {
                state.users      = action.payload
                state.isModalActive = false;
            })
    }
});

export  const { showModal, addUser } = usersSlice.actions;


export default usersSlice.reducer;



// Thunks

export const fetchUsers = createAsyncThunk( 'users' , async () => {
    const res = await fetch(process.env.REACT_APP_API_URL + "/api/users");
    const data = await res.json();

    for( let i = 0; i < data.data.length; i++ ) {
        data.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${data.data[i].image}">`
    }

    return data.data;
})

export const fetchSingleUser = createAsyncThunk( 'users/singleUser' , async (payload) => {
    const id = payload;
    const res = await fetch(process.env.REACT_APP_API_URL + `/api/users/${id}`);
    const data = await res.json();

    return data;
})

export const deleteUser = createAsyncThunk( 'deleteUser', async ( payload)=> {
        const res =         await fetch(process.env.REACT_APP_API_URL + "/api/users/" + payload, {method: "DELETE"})
        const data = await res.json();
        for( let i = 0; i < data.data.length; i++ ) {
            data.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${data.data[i].image}">`
        }

    return data.data;
}) 

export const saveUser = createAsyncThunk( 'saveUser', async ( payload)=> {
        const res =         await fetch(process.env.REACT_APP_API_URL + "/api/users", 
            {
                method: "POST",
                body: payload
            }
        )
        const data = await res.json();
        for( let i = 0; i < data.data.length; i++ ) {
            data.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${data.data[i].image}">`
        }
        console.log(data)
    return data.data;
}) 

export const updateUser = createAsyncThunk( 'updateUser', async ( payload)=> {

        const res =         await fetch(process.env.REACT_APP_API_URL + "/api/users", 
            {
                method: "PUT",
                body: payload
            }
        )
        const data = await res.json();
        for( let i = 0; i < data.data.length; i++ ) {
            data.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${data.data[i].image}">`
        }
        console.log(data)
    return data.data;
}) 