import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getPayment } from "../../features/payment/paymentSlice";

const BrownText = styled(Typography)(({ theme }) => ({
  color: "#8B4513",
}));

const OrderPage = () => {
  const paymentInfo = useSelector((state) => state.payment.payment)
  console.log(paymentInfo)
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    paymentInfo.forEach((item) => {
      const cartTotal = item.cartId?.cartItems?.reduce(
        (total, cartItem) => total + cartItem?.price * cartItem?.quantity,
        0
      );
      totalPrice += cartTotal;
    });

    return totalPrice;
  };
  if (paymentInfo === undefined || paymentInfo.length===0) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', pt:'80px' }}>
        You don't have an invoice yet
      </Typography>
    )
  }
  return (
    <Container maxWidth="md" sx={{ pt: "80px" }} >
      {
        paymentInfo.map((item) => (
          <Box mt={5} sx={{ border: '2px solid black', padding: '10px' }}>
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
              <Grid container spacing={3} sx={{ pt: '10px' }}>
                <Grid item xs={3}>
                  <Avatar
                    variant="square"
                    src={itemInfo.itemId.imgUrl[0]}
                    sx={{ width: 80, height: 80 }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{itemInfo.itemId.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{itemInfo.quantity}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" textAlign="center" sx={{ fontWeight: 'bold' }}>
                    {itemInfo?.price?.toLocaleString('vi-VN')} đ
                  </Typography>
                </Grid>

              </Grid>))}

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              {/* <Grid item xs={6}>
              <BrownText variant="h6">Shipping Address</BrownText>
              <Typography variant="body1">
                Really Good Emails <br />
                XXX X XXXXX XXX, XXXXX XX XXXXX
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <BrownText variant="h6">Details</BrownText>
              <Typography variant="body1">Subtotal: $90</Typography>
              <Typography variant="body1">Standard Shipping: $14.89</Typography>
            </Grid> */}
              <Grid item xs={12}>
                <Typography variant="h4" mt={2}>
                  Order Total: {calculateTotalPrice()?.toLocaleString('vi-VN')} đ
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h4" textAlign="center">
            </Typography>

          </Box>
        ))
      }

    </Container >


  );
};

export default OrderPage;
