import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { removeMovieFromLibrary } from "../../api/movieLibraryApi";
import type { MovieDto } from "../../types/movie.types";
import { BaseCard } from "./BaseCard";

interface MovieCardProps {
    movie: MovieDto;
    onMovieRemoved: (id: string) => void;
}

export const ReviewCard: React.FC<MovieCardProps> = ({ movie, onMovieRemoved }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleRemoveFromLibrary = async () => {
        const response = await removeMovieFromLibrary(movie);
        setMessage(response.toString());
        onMovieRemoved(movie.imdbID);
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
                <>
                <Button
                    variant="contained"
                    fullWidth 
                    onClick={handleRemoveFromLibrary}
                    sx={{ textTransform: 'none', backgroundColor: '#d34434ff', '&:hover': { backgroundColor: '#b92110ff' } }}
                >
                    Remove from My Library
                </Button>
                <Button
                    variant="contained"
                    fullWidth 
                    onClick={handleRemoveFromLibrary}
                    sx={{ textTransform: 'none', backgroundColor: '#3437d3ff', '&:hover': { backgroundColor: '#1016b9ff' } }}
                >
                    Record Review
                </Button>
                </>
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