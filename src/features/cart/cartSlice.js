import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiService from '../../app/apiService';
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';


export const createCart = createAsyncThunk(
    'cart/createCart',
    async (userId) => {
        const response = await apiService.post(`/cart`, userId);
        return response.data
    },
)

export const addItem = createAsyncThunk(
    'cart/addItem',
    async ( {userId, itemId, quantity, price, material,color} ) => {
        console.log('25', userId, itemId,quantity )
        const response = await apiService.put(`/cart/?id=${userId}`, { itemId:itemId,quantity:quantity,price:price,material:material,color:color });
        return response.data
    },
)
export const getItemInCart = createAsyncThunk(
    'cart/getItemInCart',
    async (userId) => {
        // const dispatch = useDispatch()
        // const { isAuthenticated, user } = useAuth();
        const response = await apiService.get(`/cart/?id=${userId}`);
        const dataFromApi = response.data;
        const dataFromLocal = JSON.parse(localStorage.getItem('cart')) || [];
        localStorage.removeItem('cart')
        const mergedData = mergeCartData(dataFromApi.cartItems, dataFromLocal);
        // if(isAuthenticated) dispatch(addItem({ userId: user._id, cartItemId: cartItem._id }))
        // console.log(mergedData)
        return mergedData; 
    }
);
export const getInfoCart = createAsyncThunk(
    'cart/getInfoCart',
    async (userId) => {
        const response = await apiService.get(`/cart/?id=${userId}`);
        return response.data;
    }
);
const mergeCartData = (dataFromApi, dataFromLocal) => {
    const mergedItems = [];
    const itemMap = {};
  
    dataFromApi.forEach(item => {
      const { itemId, quantity } = item; 
      if (itemMap[itemId]) {
        itemMap[itemId].quantity += quantity;
      } else {
        itemMap[itemId] = { ...item }; 
      }
    });
  
    dataFromLocal.forEach(item => {
      const { itemId, quantity } = item; 
      if (itemMap[itemId]) {
        itemMap[itemId].quantity += quantity;
      } else {
        itemMap[itemId] = { ...item }; 
      }
    });
  
    for (const itemId in itemMap) {
      mergedItems.push(itemMap[itemId]);
    }
  
    return mergedItems; 
  };

const initialState = {
    cartInfo:undefined,
    cart: undefined,
    isLoading: false,
    isError: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find(
                (cartItem) => cartItem.itemId === action.payload.itemId && cartItem.material === action.payload.material && cartItem.color === action.payload.color
            );
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.cart.push(action.payload);
            }
        },
        updateCartQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;
            console.log(itemId)
            const item = state.cart.find((cartItem) => cartItem.itemId._id === itemId);
            if (item) {
                item.quantity = quantity;
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cart = state.cart.filter(item => item.itemId._id !== itemId);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCart.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true
                state.isError = false
            })
            .addCase(createCart.fulfilled, (state, action) => {
                // Add user to the state array
                state.isLoading = false
                state.isError = false
            })
            .addCase(createCart.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false
                state.isError = true
            })
            .addCase(addItem.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true
                state.isError = false
            })
            .addCase(addItem.fulfilled, (state, action) => {
                // Add user to the state array
                state.isLoading = false
                state.isError = false
            })
            .addCase(addItem.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false
                state.isError = true
            })
            .addCase(getItemInCart.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getItemInCart.fulfilled, (state, action) => {
                state.cart = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(getItemInCart.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false
                state.isError = true
            })
            .addCase(getInfoCart.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getInfoCart.fulfilled, (state, action) => {
                state.cartInfo = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(getInfoCart.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false
                state.isError = true
            })
    }

});
export const { addToCart, updateCartQuantity, removeFromCart } = cartSlice.actions
export default cartSlice.reducer;
