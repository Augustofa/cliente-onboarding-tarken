import { Search } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';

interface SearchBarProps {
    value: string;
    onChange: (query: string) => void
    isLoading: boolean,
    sx?: object;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, isLoading, sx }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for a movie..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={isLoading}
            size="small"
            sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: 'transparent' },
                paddingRight: '4px',
            },
            }}
            InputProps={{ 
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton disabled={isLoading} sx={{ color: '#aaa' }}>
                        <Search />
                    </IconButton>
                    </InputAdornment>
                ),
            }}
        />
        </Box>
    );
}