import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; 

export const Header: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0', minWidth: "100vh" }}>
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
                    sx={{
                        color: currentPath === '/' ? 'primary.main' : 'text.primary',
                        fontWeight: currentPath === '/' ? 'bold' : 'normal',
                    }}
                >
                    Search
                </Button>
                <Button 
                    component={Link}
                    to="/my-library" 
                    sx={{
                        color: currentPath === '/my-library' ? 'primary.main' : 'text.primary',
                        fontWeight: currentPath === '/my-library' ? 'bold' : 'normal',
                    }}
                >
                    My Library
                </Button>
            </Box>
        </Toolbar>
        </AppBar>
    );
};