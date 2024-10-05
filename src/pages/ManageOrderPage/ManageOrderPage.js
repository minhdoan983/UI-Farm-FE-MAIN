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
import {  getPayment } from "../../features/payment/paymentSlice";

const BrownText = styled(Typography)(({ theme }) => ({
  color: "#8B4513",
}));

const ManageOrderPage = () => {
  const dispatch = useDispatch();
  const paymentInfo = useSelector((state) => state.payment.payment);
  const isLoading = useSelector((state) => state.payment.isLoading);
  const isError = useSelector((state) => state.payment.isError);
  const error = useSelector((state) => state.payment.error);

  useEffect(() => {
    dispatch(getPayment());
  }, [dispatch]);

  const calculateTotalPrice = (payment) => {
    let totalPrice = 0;

    payment.cartId?.cartItems?.forEach((cartItem) => {
      totalPrice += cartItem?.price * cartItem?.quantity;
    });

    return totalPrice;
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "Pending":
        return "Trạng thái thanh toán: Đang chờ thanh toán";
      case "Approved":
        return "Đã thanh toán";
      default:
        return "Trạng thái không xác định";
    }
  };

  if (isLoading) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", pt: "80px" }}>
        Đang tải dữ liệu...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", pt: "80px", color: "red" }}>
        {error || "Có lỗi xảy ra khi tải đơn hàng."}
      </Typography>
    );
  }

  if (paymentInfo === undefined || paymentInfo.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", pt: "80px" }}>
        Bạn chưa có đơn hàng nào
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ padding: "80px" }}>
      {paymentInfo.map((order) => (
        <Box key={order._id} mt={5} sx={{ border: "2px solid black", padding: "10px" }}>
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" style={{ color: "#8B4513" }}>
              UI Farm
            </Typography>
          </Box>

          <Typography variant="h5" gutterBottom textAlign="center">
            Xác nhận đơn hàng
          </Typography>
          <Typography variant="body1" gutterBottom textAlign="center">
            Chúng tôi đã nhận được đơn hàng của bạn và sẽ thông báo khi đơn hàng được vận chuyển.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <BrownText variant="h6" gutterBottom>
            Đơn hàng ({order._id}):
          </BrownText>
          {order.cartId?.cartItems?.map((cartItem, index) => (
            <Grid container spacing={3} sx={{ pt: "10px" }} key={index}>
              <Grid item xs={3}>
                <Avatar
                  variant="square"
                  src={cartItem.itemId?.imgUrl[0]}
                  sx={{ width: 80, height: 80 }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {cartItem.itemId?.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Số lượng: {cartItem.quantity}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" textAlign="center" sx={{ fontWeight: "bold" }}>
                  {cartItem.price.toLocaleString("vi-VN")} đ
                </Typography>
              </Grid>
            </Grid>
          ))}

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" mt={2}>
                Tổng đơn hàng: {calculateTotalPrice(order).toLocaleString("vi-VN")} đ
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                {getStatusLabel(order.status)}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />
        </Box>
      ))}
    </Container>
  );
};

export default ManageOrderPage;
