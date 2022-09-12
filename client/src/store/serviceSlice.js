import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const STATUSES = Object.freeze( {
    IDLE: 'idle',
    ERROR:  'error',
    LOADING: 'loading'

})

const initialState = {
    services: [],
    singleService: {},
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

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        showModal( state, action ){
            state.isModalActive = action.payload;
        },

    },

    extraReducers: ( builder ) => {
        builder
            .addCase(fetchServices.pending , (state, action ) => {
                state.status = STATUSES.LOADING
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.services = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            }).addCase(fetchSingleService, (state, action) =>{
                console.log(action)
                state.singleService = action.payload.singleService
                state.isModalActive = action.payload.isModalActive;
            })
    }
});

export  const { showModal } = serviceSlice.actions;


export default serviceSlice.reducer;



// Thunks

export const fetchServices = createAsyncThunk( 'services' , async () => {
    const res = await fetch(process.env.REACT_APP_API_URL + "/api/services");

    const data = await res.json();
    for( let i = 0; i < data.data.length; i++ ) {
        data.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${data.data[i].image}">`
    }

    return data.data;
})

export const fetchSingleService = createAsyncThunk( 'services/singleService' , async (payload) => {
    const [isModalActive, id] = payload;
        
    const res = await fetch(process.env.REACT_APP_API_URL + `/api/services/${id}`);
    const data = await res.json();
    console.log(data)
    return [isModalActive, data.data];
})

// export  function fetchSingleServices() {
//     return async function fetchProductThunk( dispatch, getState ) {
//
//         console.log(getState)
//         dispatch(setStatus(STATUSES.LOADING))
//         try{
//
//             const res = await fetch('https://fakestoreapi.com/products');
//
//             const data = await res.json();
//
//             dispatch(setProduct(data))
//
//             dispatch(setStatus(STATUSES.IDLE))
//
//         }catch (err){
//
//             console.log(err)
//
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }
// }
