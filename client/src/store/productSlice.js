import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const initialState = {
    data: [],
    status: STATUSES.IDLE,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // setProduct ( state , action ) {
        //
        //     state.data = action.payload
        // },
        //
        // setStatus( state, action ){
        //     state.status = action.payload;
        // },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;

                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export const { setProduct, setStatus } = productSlice.actions;

export default productSlice.reducer;

// Thunks

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch('https://fakestoreapi.com/products');

    const data = await res.json();

    return data;
});

// export  function fetchProducts() {
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
