import React from 'react';
import { Outlet } from 'react-router-dom';
import './BlankLayout.css';
import Img from '../login.jfif';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

function BlankLayout() {
  return (
    <Box minHeight='100vh' className='login-page' sx={{ flexGrow: 1}}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6}>
          <img className='UI-farm-icon' alt='UI-farm-icon' src={Img} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>

  );
}

export default BlankLayout;
