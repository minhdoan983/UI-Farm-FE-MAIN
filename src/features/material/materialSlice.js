import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiService from '../../app/apiService';

export const getAllMaterial = createAsyncThunk(
    'material/getAllMaterial',
    async () => {
        const response = await apiService.get(`/materials`);
        return response.data
    },
)

const initialState = {
    materialList: null,
    isLoading: false,
    isError: false,
};

const materialSlice = createSlice({
    name: 'material',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMaterial.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getAllMaterial.fulfilled, (state, action) => {
                state.materialList=action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(getAllMaterial.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
    }

});
export default materialSlice.reducer;
