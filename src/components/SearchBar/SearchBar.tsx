import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';

interface SearchBarProps {
    value: string;
    onChange: (query: string) => void
    isLoading: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, isLoading }) => {
    return (
        <Box sx={{ marginBottom: 4 }}>
            <TextField
                fullWidth
                variant="outlined"
                label="Search for a movie..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={isLoading}
            />
        </Box>
    )
}