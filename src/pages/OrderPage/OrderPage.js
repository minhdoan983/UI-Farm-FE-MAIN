import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentByUser } from "../../features/payment/paymentSlice";
import useAuth from "../../hooks/useAuth";



const BrownText = styled(Typography)(({ theme }) => ({
  color: "#8B4513",
}));

const OrderPage = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();
  console.log({user})
  const paymentInfo = useSelector((state) => state.payment.payment);
  const isLoading = useSelector((state) => state.payment.isLoading);
  const isError = useSelector((state) => state.payment.isError);

  useEffect(() => {
    dispatch(getPaymentByUser(user._id));  
  }, [dispatch]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    paymentInfo?.forEach((item) => {
      const cartTotal = item.cartId?.cartItems?.reduce(
        (total, cartItem) => total + cartItem?.price * cartItem?.quantity,
        0
      );
      totalPrice += cartTotal;
    });

    return totalPrice;
  };

  if (isLoading) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", pt: "80px" }}>
        Loading your orders...
      </Typography>
    );
  }

  if (isError || !paymentInfo || paymentInfo.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", pt: "80px" }}>
        You don't have any orders yet.
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ pt: "80px" }}>
      {paymentInfo.map((item) => (
        <Box key={item._id} mt={5} sx={{ border: "2px solid black", padding: "10px" }}>
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" style={{ color: "#8B4513" }}>
              UI Farm
            </Typography>
          </Box>

          <Typography variant="h5" gutterBottom textAlign="center">
            Order Confirmation
          </Typography>
          <Typography variant="body1" gutterBottom textAlign="center">
            We received your order and we’ll let you know when we ship it out.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <BrownText variant="h6" gutterBottom>
            Your Order ({item._id}):
          </BrownText>

          {item?.cartId?.cartItems?.map((itemInfo) => (
            <Grid container spacing={3} sx={{ pt: "10px" }} key={itemInfo._id}>
              <Grid item xs={3}>
                <Avatar
                  variant="square"
                  src={itemInfo.itemId.imgUrl[0]}
                  sx={{ width: 80, height: 80 }}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {itemInfo.itemId.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {itemInfo.quantity}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" textAlign="center" sx={{ fontWeight: "bold" }}>
                  {itemInfo?.price?.toLocaleString("vi-VN")} đ
                </Typography>
              </Grid>
            </Grid>
          ))}

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" mt={2}>
                Order Total: {calculateTotalPrice()?.toLocaleString("vi-VN")} đ
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />
        </Box>
      ))}
    </Container>
  );
};

export default OrderPage;
