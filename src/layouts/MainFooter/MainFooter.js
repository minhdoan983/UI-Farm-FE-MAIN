import React from 'react';
import { Grid, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Instagram, Facebook } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MainFooter = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', padding: '40px 20px' }}>
      <Grid 
        container 
        spacing={4} 
        sx={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          textAlign: { xs: 'center', sm: 'left' } 
        }}
      >
        
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" fontWeight="bold">menu</Typography>
          <Typography component="a" href="/" sx={{ color: '#fff', display: 'block', textDecoration: 'none', marginTop: '10px' }}>Trang Chủ</Typography>
          <Typography component="a" href="/item" sx={{ color: '#fff', display: 'block', textDecoration: 'none', marginTop: '10px' }}>Mua Sắm</Typography>
          <Typography component="a" href="/login" sx={{ color: '#fff', display: 'block', textDecoration: 'none', marginTop: '10px' }}>Đăng Nhập</Typography>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="h6" fontWeight="bold">more info</Typography>
          <Typography component="a" href="/store" sx={{ color: '#fff', display: 'block', textDecoration: 'none', marginTop: '10px' }}>Cửa Hàng</Typography>
          <Typography component="a" href="/contact" sx={{ color: '#fff', display: 'block', textDecoration: 'none', marginTop: '10px' }}>Liên Hệ</Typography>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="h6" fontWeight="bold">get notified</Typography>
          <Typography sx={{ marginTop: '10px' }}>Be the first to know when a new item goes live.</Typography>
          <Box component="form" sx={{ display: 'flex', marginTop: '10px' }}>
            <TextField 
              variant="outlined" 
              placeholder="Email" 
              size="small"
              disabled
              sx={{ backgroundColor: '#fff', borderRadius: '4px', flexGrow: 1, marginRight: '10px' }} 
            />
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ backgroundColor: '#fff', color: '#000', fontWeight: 'bold' }}>
              JOIN
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="h6" fontWeight="bold">social</Typography>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, gap: '10px', marginTop: '10px' }}>
            <IconButton href="https://www.instagram.com/uifarm_2020/" sx={{ color: '#fff' }}>
              <Instagram />
            </IconButton>
            <IconButton href="https://www.facebook.com/UIfarm2020" sx={{ color: '#fff' }}>
              <Facebook />
            </IconButton>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default MainFooter;
