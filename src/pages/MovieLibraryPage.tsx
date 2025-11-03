import { Alert, Box, CircularProgress, Container, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getDefaultLibrary } from "../api/movieLibraryApi";
import { Header } from "../components/Header/Header";
import { LibraryList } from "../components/MoviesList/LibraryList";
import type { MovieDto } from "../types/movie.types";

function MovieLibraryPage() {
    const [movies, setMovies] = useState<MovieDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        updateLibrary();
    }, []);

    const updateLibrary = async () => {
        setIsLoading(true);
        const library = await getDefaultLibrary();
        setMovies(library?.movies!);
        setIsLoading(false);

    }

    const showSnackbarMessage = (message: string) => {
        setSnackbarOpen(true);
        setMessage(message);
    };

    const closeSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
    
    return (
        <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', minWidth: '100vh' }}>
            <Header />
            <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
                <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'medium', color: '#333' }}>
                    My Library
                </Typography>
                
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <LibraryList movies={movies} showMessage={showSnackbarMessage} onMovieUpdated={updateLibrary} />
                )}
            </Container>
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
        </Box>
    );
}

export default MovieLibraryPage;