import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { addMovieToLibrary } from "../../api/movieLibraryApi";
import type { MovieDto } from "../../types/movie.types";
import { BaseCard } from "./BaseCard";

interface MovieCardProps {
    movie: MovieDto;
}

export const SearchCard: React.FC<MovieCardProps> = ({ movie }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleAddToLibrary = async () => {
        const response = await addMovieToLibrary(movie);
        setMessage(response.toString());
        setSnackbarOpen(true);
    }

    const closeSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
        <BaseCard
            movie={movie}
            actions={
                <Button
                    variant="contained" 
                    color="success"
                    fullWidth 
                    onClick={handleAddToLibrary}
                    sx={{ textTransform: 'none', backgroundColor: '#34d399', '&:hover': { backgroundColor: '#10b981' } }}
                >
                    Add to My Library
                </Button>
            }
        >
        </BaseCard>
        
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={closeSnackbar}
                severity="info"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
        </>
    )
}