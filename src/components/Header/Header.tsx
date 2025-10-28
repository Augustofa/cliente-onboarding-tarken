import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom'; 

export const Header: React.FC = () => {
    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
            <Typography 
                variant="h5" 
                align="left"
                component={Link}
                to="/"
                sx={{ textDecoration: 'none', color: 'orange', fontWeight: 'bold' }}
            >
                Moovy
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block', flex: 'flex' }, ml: 10 }}>
                <Button 
                    component={Link}
                    to="/" 
                    sx={{ color: 'text.primary', '&.active': { fontWeight: 'bold' } }}
                >
                    Search
                </Button>
                <Button 
                    component={Link}
                    to="/my-library" 
                    sx={{ color: 'text.secondary' }}
                >
                    My Library
                </Button>
            </Box>
        </Toolbar>
        </AppBar>
    );
};