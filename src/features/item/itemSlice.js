import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

export const fetchAllItems = createAsyncThunk(
  "items/fetchAllItems",
  async () => {
    const response = await apiService.get("/items");
    return response.data;
  }
);
export const fetchItemByGallery = createAsyncThunk(
  "items/fetchItemByGallery",
  async (gallery, thunkAPI) => {
    const response = await apiService.get(
      `/galleries/id/?id=66dde3508d796c0316f55c5b`
    );
    return response.data;
  }
);

export const fetchItemBySearch = createAsyncThunk(
  "items/fetchItemBySearch",
  async (search, thunkAPI) => {
    const response = await apiService.get(
      `/items/search/?with_search=${search}`
    );
    return response.data;
  }
);
export const filterItems = createAsyncThunk(
  "items/filterItems",
  async (filter) => {
    const { currentPage } = filter;
    const response = await apiService.get(
      `/items/filter/?with_color=${filter.selectedColors || ""}&with_gallery=${
        filter.selectedGallery || ""
      }&min_price=${filter.selectedPrice?.min || ""}&max_price=${
        filter.selectedPrice?.max || ""
      }&page=${currentPage}`
    );
    return response.data;
  }
);

export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (id, thunkAPI) => {
    const response = await apiService.get(`/items/id/?id=${id}`);
    return response.data;
  }
);
export const fetchItemForCart = createAsyncThunk(
  "items/fetchItemForCart",
  async (id) => {
    const response = await apiService.get(`/items/id/?id=${id}`);
    return response.data;
  }
);
export const updateItem = createAsyncThunk(
  "item/updateItem",
  async ({ id, ...updatedData }) => {
    const response = await apiService.put(`/items/${id}`, updatedData);
    return response.data;
  }
);
export const createItem = createAsyncThunk(
  "item/createItem",
  async (itemData, thunkAPI) => {
    const response = await apiService.post("/items", itemData); 
    return response.data.data;
  }
);

export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (itemId) => {
      const response = await apiService.delete(`/items/${itemId}`);
      return response.data; 
  }
);


const initialState = {
  itemArray: [],
  isLoading: false,
  isError: false,
  item: [],
  itemcart: null,
  total: null,
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItems.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.itemArray = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(fetchItemByGallery.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchItemByGallery.fulfilled, (state, action) => {
        state.itemArray = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchItemByGallery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchItemBySearch.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchItemBySearch.fulfilled, (state, action) => {
        state.itemArray = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchItemBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchItemById.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.item = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchItemForCart.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchItemForCart.fulfilled, (state, action) => {
        state.itemcart = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchItemForCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(filterItems.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(filterItems.fulfilled, (state, action) => {
        state.itemArray = action.payload.items;
        state.total = action.payload.totalItems;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(filterItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default itemSlice.reducer;
