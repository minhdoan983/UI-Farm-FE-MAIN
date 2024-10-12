import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiService from '../../app/apiService';

export const createOrderId = createAsyncThunk(
    'payment/createOrderId',
    async ({total,cartId}) => {
        const response = await apiService.post(`/payment/orders`,{total,cartId});
        return response.data
    },
)
export const captureOrder = createAsyncThunk(
    'payment/captureOrder',
    async ({orderId,cartId,shippingAddress}) => {
        console.log(orderId,cartId,shippingAddress)
        const response = await apiService.post(`/payment/orders/${orderId}/capture`,{cartId,shippingAddress});
        return response.data
    },
)

export const getPayment = createAsyncThunk(
    'payment/getPayment',
    async () => {
        const response = await apiService.get(`/payment`);
        return response.data
    },
)
export const getPaymentByUser = createAsyncThunk(
    'payment/getPaymentByUser',
    async (userId) => {
        const response = await apiService.get(`/payment/user/${userId}`);
        return response.data;
    }
);

const initialState = {
    orderId:'',
    orderData:'',
    payment:'',
    isLoading: false,
    isError: false,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrderId.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(createOrderId.fulfilled, (state, action) => {
                state.orderId=action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(createOrderId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(captureOrder.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(captureOrder.fulfilled, (state, action) => {
                state.orderData=action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(captureOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(getPayment.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getPayment.fulfilled, (state, action) => {
                state.payment=action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(getPayment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(getPaymentByUser.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getPaymentByUser.fulfilled, (state, action) => {
                state.payment=action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(getPaymentByUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
    }

});
export default paymentSlice.reducer;
