import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiService from '../../app/apiService'
import { act } from 'react';

export const fetchAllItems = createAsyncThunk(
    'items/fetchAllItems',
    async () => {
        const response = await apiService.get('/items');
        return response.data
    },
)
export const fetchItemByCollection = createAsyncThunk(
    'items/fetchItemByCollection',
    async (gallery, thunkAPI) => {
        const response = await apiService.get(`/galleries/id/?id=66dde3508d796c0316f55c5b`);
        return response.data
    },
)

export const fetchItemBySearch = createAsyncThunk(
    'items/fetchItemBySearch',
    async (search, thunkAPI) => {
        const response = await apiService.get(`/items/search/?with_search=${search}`);
        return response.data
    },
)
export const filterItems = createAsyncThunk(
    'items/filterItems',
    async (filter) => {
      const response = await apiService.get(`/items/filter/?with_color=${filter.selectedColors || ''}&with_gallery=${filter.selectedGallery || ''}&min_price=${filter.selectedPrice?.min || ''}&max_price=${filter.selectedPrice?.max || ''}`);      console.log(response);
      if(filter.selectedGallery) return response.data[0].listItem;
      return response.data

    }
  );
  
export const fetchItemById = createAsyncThunk(
    'items/fetchItemById',
    async (id, thunkAPI) => {
        const response = await apiService.get(`/items/id/?id=${id}`);
        return response.data
    },
)
export const fetchItemForCart = createAsyncThunk(
    'items/fetchItemForCart',
    async (id) => {
        const response = await apiService.get(`/items/id/?id=${id}`);
        return response.data
    },
)


const initialState = {
    itemArray: [],
    isLoading: false,
    isError: false,
    item:[],
    itemcart:null
}

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchAllItems.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllItems.fulfilled, (state, action) => {
                // Add user to the state array
                state.itemArray = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(fetchAllItems.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false
                state.isError = true
            })

            .addCase(fetchItemByCollection.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchItemByCollection.fulfilled, (state, action) => {
                // Add user to the state array
                state.itemArray = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(fetchItemByCollection.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false
                state.isError = true
            })
            .addCase(fetchItemBySearch.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchItemBySearch.fulfilled, (state, action) => {
                // Add user to the state array
                state.itemArray = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(fetchItemBySearch.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false
                state.isError = true
            })
            .addCase(fetchItemById.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchItemById.fulfilled, (state, action) => {
                // Add user to the state array
                state.item = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(fetchItemById.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false
                state.isError = true
            })
            .addCase(fetchItemForCart.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchItemForCart.fulfilled, (state, action) => {
                // Add user to the state array
                state.itemcart = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(fetchItemForCart.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false
                state.isError = true
            })
            .addCase(filterItems.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true
                state.isError = false
            })
            .addCase(filterItems.fulfilled, (state, action) => {
                // Add user to the state array
                state.itemArray = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(filterItems.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false
                state.isError = true
            })
    },
})

export default itemSlice.reducer