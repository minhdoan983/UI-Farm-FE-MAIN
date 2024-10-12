import React from 'react';
import MainHeader from './MainHeader/MainHeader';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MainFooter from './MainFooter/MainFooter';

function MainLayout() {
    return (
        <Box
            display="flex"
            flexDirection="column" 
            sx={{
                minHeight: '100vh', 
            }}
        >
            <MainHeader />
            <Box sx={{ flex: '1 0 auto' }}> 
                <Outlet />
            </Box>
            <MainFooter />
        </Box>
    );
}

export default MainLayout;
