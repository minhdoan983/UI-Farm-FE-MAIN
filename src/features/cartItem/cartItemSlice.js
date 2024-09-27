import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiService from '../../app/apiService';

export const createCartItem = createAsyncThunk(
    'cartItem/createCartItem',
    async (item) => {
        const response = await apiService.post(`/cartItem`, item);
        return response.data
    },
    // async ({userId, cartItemId}) =>{
    //     const response = await apiService.put(`/cart/?id=${userId}`,cartItemId);
    //     return response.data
    // }
)
export const getCartItem = createAsyncThunk(
    'cartItem/getCartItem',
    async (item) => {
        const response = await apiService.get(`/cartItem`, item);
        return response.data
    },
    // async ({userId, cartItemId}) =>{
    //     const response = await apiService.put(`/cart/?id=${userId}`,cartItemId);
    //     return response.data
    // }
)
export const createCartItemFromLocal = createAsyncThunk(
    'cartItem/createCartItemFromLocal',
    async (_, { dispatch }) => {
        const itemFromLocal = JSON.parse(localStorage.getItem('cart')) || [];

        // Dùng Promise.all để gửi các mục trong localStorage song song
        const result = await Promise.all(
            itemFromLocal.map(async (item) => {
                console.log({ itemId: item.itemId, quantity: item.quantity, price: item.price });
                // Dispatch createCartItem cho từng item
                const resultAction = await dispatch(createCartItem({ itemId: item.itemId, quantity: item.quantity, price: item.price }));
                return resultAction.payload; // Trả về payload của từng CartItem
            })
        );
        console.log(result, 'dagidbjkabsdkjasb')
        return result
    }
);

const initialState = {
    cartItem: null,
    listCartItem: null,
    isLoading: false,
    isError: false,
};

const cartItemSlice = createSlice({
    name: 'cartItem',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCartItem.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(createCartItem.fulfilled, (state, action) => {
                state.cartItem = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(createCartItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(getCartItem.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getCartItem.fulfilled, (state, action) => {
                state.listCartItem = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(getCartItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(createCartItemFromLocal.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(createCartItemFromLocal.fulfilled, (state, action) => {
                state.listCartItem = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(createCartItemFromLocal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
    }

});
export default cartItemSlice.reducer;
