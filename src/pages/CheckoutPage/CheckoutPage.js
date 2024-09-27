import React, { useEffect, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { captureOrder, createOrderId } from '../../features/payment/paymentSlice';
import { getInfoCart } from '../../features/cart/cartSlice';
import useAuth from '../../hooks/useAuth';

const CheckoutPage = ({ cartItems }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingAddress, setShippingAddress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
  }, [shippingAddress]);

  const handleCreateOrder = async () => {

    const total = calculateTotalPrice();
    const cartInfo = await dispatch(getInfoCart(user?._id)).unwrap();
    console.log('Cart Info:', cartInfo);
    
    const order = await dispatch(createOrderId({ total, cartId: cartInfo?._id, shippingAddress })).unwrap();
    console.log("Order ID created:", order);
    return order.jsonResponse.id;
  };

  const handleCaptureOrder = async (orderId) => {
    const cartInfo = await dispatch(getInfoCart(user?._id)).unwrap();
    const orderData = await dispatch(captureOrder({ orderId, cartId: cartInfo._id })).unwrap();
    alert("Transaction completed by " + orderData.payer.name.given_name);
    navigate('/');
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.price / 25000, 0);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', width: '400px' }}>
        <h3>Order Summary</h3>
        {cartItems.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>{item.name}</span>
            <span>{(item.price / 25000).toFixed(2)} $</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span>{calculateTotalPrice().toFixed(2)} $</span>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="shippingAddress">Shipping Address:</label>
          <input
            type="text"
            id="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter your address"
            style={{ width: '100%', padding: '10px', marginTop: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        <PayPalButtons
          createOrder={() => handleCreateOrder()}
          onApprove={(data) => handleCaptureOrder(data.orderID)}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
