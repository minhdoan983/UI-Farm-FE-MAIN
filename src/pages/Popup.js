import { Box, Drawer, Typography, IconButton, Grid, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getItemInCart, removeFromCart, updateCartQuantity } from '../features/cart/cartSlice';
import { fetchItemForCart } from '../features/item/itemSlice';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Popup({ setIsCartOpen, isCartOpen }) {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (isCartOpen) {
      setLoading(true);
      const loadCartItems = async () => {
        let listCartItem = [];

        if (!isAuthenticated) {
          const storedCart = localStorage.getItem('cart');
          listCartItem = storedCart ? JSON.parse(storedCart) : [];
        } else {
          listCartItem = await dispatch(getItemInCart(user?._id)).unwrap();
        }

        const items = await Promise.all(
          listCartItem.map(async (item) => {
            const actionResult = await dispatch(fetchItemForCart(item.itemId));
            return { ...unwrapResult(actionResult), ...item };
          })
        );

        setCartItems(items);
        setLoading(false);
      };

      loadCartItems();
    }
  }, [isCartOpen, dispatch, isAuthenticated]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartQuantity({ itemId, quantity: newQuantity }));

      const updatedCart = cartItems.map(item =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);  
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));

    const updatedCart = cartItems.filter(item => item.itemId !== itemId);
    setCartItems(updatedCart);  
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
  };

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)} sx={{ width: 400 }}>
    <Box sx={{ width: 400, padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Cart ({cartItems.length})</Typography>
        <IconButton onClick={() => setIsCartOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography> 
      ) : (
        cartItems.length === 0 ? (
          <Typography>No items in the cart.</Typography>
        ) : (
          <Grid container direction="column" spacing={2}>
            {cartItems.map((cartItem, index) => (
              <Grid item key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                  <img src={cartItem.imgUrl[0]} alt={cartItem.name} style={{ width: 60, height: 60, borderRadius: '8px' }} />
                  <Box sx={{ flexGrow: 1, paddingLeft: 2 }}>
                    <Typography>{cartItem.name}</Typography>
                    <Typography>Price: {cartItem.price.toLocaleString('vi-VN')} đ</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => handleQuantityChange(cartItem.itemId, cartItem.quantity - 1)} disabled={cartItem.quantity <= 1}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{cartItem.quantity}</Typography>
                      <IconButton onClick={() => handleQuantityChange(cartItem.itemId, cartItem.quantity + 1)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Button variant="outlined" onClick={() => handleRemoveItem(cartItem.itemId)}>Remove</Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        )
      )}

      {cartItems.length > 0 && !loading && (
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="h6">Total: {calculateTotalPrice().toLocaleString('vi-VN')} đ</Typography>
          <Button variant="contained" sx={{ marginTop: '20px' }} onClick={() => navigate('/cart')}>Go to Cart</Button>
        </Box>
      )}
    </Box>
  </Drawer>
  );
}

export default Popup;
