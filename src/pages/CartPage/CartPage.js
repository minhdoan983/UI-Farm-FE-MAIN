import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Box, Button, Grid, IconButton, Collapse, CircularProgress } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getItemInCart, removeFromCart, updateCartQuantity } from '../../features/cart/cartSlice';
import useAuth from '../../hooks/useAuth';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchItemForCart } from '../../features/item/itemSlice';
import CheckoutPage from '../CheckoutPage/CheckoutPage';

function CartPage() {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [checkout, setCheckout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const loadCartItems = async () => {
      let listCartItem = [];

      if (!isAuthenticated) {
        const storedCart = localStorage.getItem('cart');
        listCartItem = storedCart ? JSON.parse(storedCart) : [];
      } else {
        const cartFromServer = await dispatch(getItemInCart(user._id)).unwrap();
        listCartItem = cartFromServer;
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
  }, [dispatch, isAuthenticated]);

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

  const toggleExpand = (index) => {
    setExpanded((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
  };

  const handleCheckout = () => {
    setCheckout(!checkout);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: { xs: '10px', md: '80px' }, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: '800px', width: '100%', backgroundColor: 'white', borderRadius: '8px', boxShadow: 3 }}>
        <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
          Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            No items in the cart.
          </Typography>
        ) : (
          <Grid container direction="column" spacing={3}>
            {cartItems.map((item, index) => (
              <Grid item key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    maxWidth: '600px',
                    margin: '0 auto',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ marginRight: { md: '20px' }, marginBottom: { xs: '10px', md: '0' } }}>
                    <img
                      src={item.imgUrl[0]}
                      alt={item.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {item.name}
                      </Typography>
                      <IconButton onClick={() => toggleExpand(index)}>
                        {expanded[index] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                      }}
                    >
                      {`${item.quantity} x ${item.price.toLocaleString('vi-VN')} đ`}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleQuantityChange(item.itemId, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <Typography sx={{ margin: '0 10px' }}>{item.quantity}</Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleQuantityChange(item.itemId, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </Box>

                    <Box sx={{ marginTop: '10px' }}>
                      <Button variant="contained" color="error" size="small" onClick={() => handleRemoveItem(item.itemId)}>
                        Remove
                      </Button>
                    </Box>

                    <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                      <Typography variant="body2" sx={{ marginTop: '10px' }}>
                        Material: {item.material}
                      </Typography>
                      <Typography variant="body2">
                        Color: {item.color}
                      </Typography>
                    </Collapse>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {cartItems.length > 0 && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Total: {calculateTotalPrice().toLocaleString('vi-VN')} đ
            </Typography>
            {!checkout ? (
              <Button
                variant="contained"
                onClick={handleCheckout}
                sx={{
                  backgroundColor: '#f39c12',
                  color: 'white',
                  padding: '10px 20px',
                  marginTop: '10px',
                  '&:hover': {
                    backgroundColor: '#e67e22',
                  },
                }}
              >
                Thanh Toán!
              </Button>
            ) : (
              <CheckoutPage cartItems={cartItems} />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CartPage;
