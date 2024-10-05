import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CardMedia, Typography, Stack, Box, Button, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById } from '../../features/item/itemSlice';
import { addItem } from '../../features/cart/cartSlice'; // Import action to update quantity
import useAuth from '../../hooks/useAuth';
import Popup from '../Popup';
import { Radio } from 'antd';
import { InputNumber } from 'antd';
function DetailPage() {
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item.item);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchItemById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (item && item.imgUrl && item.imgUrl.length > 0) {
      setMainImage(item.imgUrl[0]);
    }
  }, [item]);

  const handleImageClick = (image) => {
    setMainImage(image);
  };



  const handleAddToCart = async (item, quantity) => {
    const itemInfo = {
      itemId: item._id,
      quantity,
      price: item.price,
      material,
      color,
      imgUrl:item.imgUrl[0]
    };
    if (isAuthenticated) {
      await dispatch(addItem({ userId: user._id, itemId: item._id, quantity: quantity, price: item.price,material:material,color:color }))
    } else {
      let currentCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      const existingItem = currentCart.find((cartItem) => cartItem.itemId === item._id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        currentCart.push(itemInfo);
      }
      localStorage.setItem('cart', JSON.stringify(currentCart))
    }
    setIsCartOpen(true);
  };



  return (
    <Box sx={{ padding: { xs: '90px', md: '90px' }, display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start' }}>
            <CardMedia
              component="img"
              image={mainImage}
              alt={item?.name || 'Item Image'}
              sx={{
                width: { xs: '100%', md: '400px' },
                height: { xs: '500px', md: '500px' },
                objectFit: 'cover',
                borderRadius: '10px',
                marginBottom: { xs: '20px', md: '0' },
                marginRight: { md: '20px' },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                maxWidth: { xs: '100%', md: '150px' },
                height: { xs: '150px', md: '500px' },
                overflowY: 'scroll',
                flexDirection: { xs: 'row', md: 'column' },
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              {item?.imgUrl?.map((image, index) => (
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleImageClick(image)}
                  sx={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    border: mainImage === image ? '2px solid black' : '1px solid #ccc',
                    transition: 'border 0.3s ease',
                    marginBottom: '10px',
                  }}
                  key={index}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {item?.name}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {item?.price ? `${item.price.toLocaleString('vi-VN')} đ` : ''}
            </Typography>
            <Radio.Group block onChange={(e) => setColor(e.target.value)} buttonStyle="solid" style={{display:'flex',justifyContent:'center'}}>
              {item?.color?.map((option,index)=>(
                <Radio.Button value={option}>{option}</Radio.Button>
              ))}
            </Radio.Group>
            <Radio.Group block onChange={(e) => setMaterial(e.target.value)} buttonStyle="solid" style={{display:'flex',justifyContent:'center'}}>
              {item?.material?.map((option,index)=>(
                <Radio.Button value={option.name}>{option.name}</Radio.Button>
              ))}
            </Radio.Group>
            <InputNumber   min={1} defaultValue={1} onChange={(e) => setQuantity(Number(e.value))} />
            <Button
              variant="contained"
              width='500px'
              onClick={() => {
                console.log('175', item, quantity)
                handleAddToCart(item, quantity)
              }
              }

              sx={{
                backgroundColor: '#1677ff',
                color: 'white',
                fontSize: '16px',
                padding: '12px 0',
                '&:hover': {
                  backgroundColor: '#1599ff',
                },
              }}
            >
              ADD TO CART
            </Button>
            <Divider sx={{ marginY: '20px' }} />
          </Stack>
        </Grid>
      </Grid>

      <Popup setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />
    </Box>
  );
}

export default DetailPage;
