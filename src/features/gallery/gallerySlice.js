import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

export const fetchAllGalleries = createAsyncThunk(
  "galleries/fetchAllGalleries",
  async () => {
      const response = await apiService.get("/galleries");
      return response.data; 
  }
);

export const createGallery = createAsyncThunk(
  "galleries/createGallery",
  async (galleryData) => {
      const response = await apiService.post("/galleries", galleryData);
      return response.data;
  }
);

export const deleteGallery = createAsyncThunk(
  "galleries/deleteGallery",
  async (galleryId) => {
      await apiService.delete(`/galleries/${galleryId}`);
      return galleryId;
  }
);

export const addItemToGallery = createAsyncThunk(
  "galleries/addItemToGallery",
  async ({ galleryId, itemId }, thunkAPI) => {
      const response = await apiService.post(`/galleries/${galleryId}/items`, { itemId });
      return { galleryId, item: response.data };
  }
);

const initialState = {
  galleries: [],
  isLoading: false,
  isError: false,
  error: null,
};

const gallerySlice = createSlice({
  name: "galleries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGalleries.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchAllGalleries.fulfilled, (state, action) => {
        state.galleries = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAllGalleries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload.message || "Failed to fetch galleries";
      });

    builder
      .addCase(createGallery.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createGallery.fulfilled, (state, action) => {
        state.galleries.push(action.payload);
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(createGallery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload.message || "Failed to create gallery";
      });

    builder
      .addCase(deleteGallery.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(deleteGallery.fulfilled, (state, action) => {
        state.galleries = state.galleries.filter(
          (gallery) => gallery._id !== action.payload
        );
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteGallery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload.message || "Failed to delete gallery";
      });

    builder
      .addCase(addItemToGallery.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(addItemToGallery.fulfilled, (state, action) => {
        const { galleryId, item } = action.payload;
        const gallery = state.galleries.find((g) => g._id === galleryId);
        if (gallery) {
          gallery.listItem.push(item);
        }
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addItemToGallery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload.message || "Failed to add item to gallery";
      });
  },
});

export default gallerySlice.reducer;
