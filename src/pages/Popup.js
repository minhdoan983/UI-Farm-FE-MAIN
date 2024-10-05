import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  getItemInCart,
  removeFromCart,
  updateCartQuantity,
} from "../features/cart/cartSlice";
import { fetchItemForCart } from "../features/item/itemSlice";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Popup({ setIsCartOpen, isCartOpen }) {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      setLoading(true);
      const loadCartItems = async () => {
        let listCartItem = [];

        if (!isAuthenticated) {
          const storedCart = localStorage.getItem("cart");
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
    if (isAuthenticated) {
      if (newQuantity > 0) {
        dispatch(
          updateCartQuantity({
            userId: user._id,
            itemId,
            quantity: newQuantity,
          })
        ).then((action) => {
          if (action.type === "cart/updateCartQuantity/fulfilled") {
            setCartItems((prevItems) =>
              prevItems.map((item) =>
                item.itemId === itemId
                  ? { ...item, quantity: newQuantity }
                  : item
              )
            );
          }
        });
      }
    } else {
      let currentCart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      const existingItem = currentCart.find(
        (cartItem) => cartItem.itemId === itemId
      );

      if (existingItem) {
        if (newQuantity > 0) {
          existingItem.quantity = newQuantity;
        } else {
          currentCart = currentCart.filter(
            (cartItem) => cartItem.itemId !== itemId
          );
        }
      }

      localStorage.setItem("cart", JSON.stringify(currentCart));
      setCartItems(currentCart);
    }
  };

  const handleRemoveItem = (itemId) => {
    if (isAuthenticated) {
      dispatch(removeFromCart({ userId: user._id, itemId })).then((action) => {
        if (action.type === "cart/removeFromCart/fulfilled") {
          setCartItems((prevItems) =>
            prevItems.filter((item) => item.itemId !== itemId)
          );
        }
      });
    } else {
      let currentCart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      currentCart = currentCart.filter(
        (cartItem) => cartItem.itemId !== itemId
      );
      localStorage.setItem("cart", JSON.stringify(currentCart));
      setCartItems(currentCart);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
  };

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      sx={{ width: { xs: 300, sm: 400 } }}
    >
      <Box sx={{ width: "100%", padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Cart ({cartItems.length})</Typography>
          <IconButton onClick={() => setIsCartOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : cartItems?.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            No items in the cart.
          </Typography>
        ) : (
          <Grid container direction="column" spacing={2}>
            {cartItems?.map((cartItem, index) => (
              <Grid item key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #ddd",
                    padding: "10px 0",
                  }}
                >
                  <img
                    src={
                      isAuthenticated ? cartItem?.imgUrl[0] : cartItem?.imgUrl
                    }
                    alt={cartItem.name}
                    style={{ width: 60, height: 60, borderRadius: "8px" }}
                  />
                  <Box sx={{ flexGrow: 1, paddingLeft: 2 }}>
                    <Typography>{cartItem.name}</Typography>
                    <Typography>
                      Price: {cartItem.price.toLocaleString("vi-VN")} đ
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.itemId,
                            cartItem.quantity - 1
                          )
                        }
                        disabled={cartItem.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{cartItem.quantity}</Typography>
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.itemId,
                            cartItem.quantity + 1
                          )
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveItem(cartItem.itemId)}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {cartItems.length > 0 && !loading && (
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <Typography variant="h6">
              Total: {calculateTotalPrice().toLocaleString("vi-VN")} đ
            </Typography>
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default Popup;
