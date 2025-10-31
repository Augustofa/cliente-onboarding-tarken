import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getDefaultLibrary } from "../api/movieLibraryApi";
import { Header } from "../components/Header/Header";
import { LibraryList } from "../components/MoviesList/LibraryList";
import type { MovieDto } from "../types/movie.types";

function MovieLibraryPage() {
    const [movies, setMovies] = useState<MovieDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const updateLibrary = async () => {
            setIsLoading(true);
            const library = await getDefaultLibrary();
            setMovies(library?.movies!);
            setIsLoading(false);
        }

        updateLibrary();
    }, []);

    const handleMovieRemoved = (idToRemove: string) => {
        setMovies(currentMovies => 
            currentMovies.filter(movie => movie.imdbID !== idToRemove)
        );
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
                    <LibraryList movies={movies} onMovieRemoved={handleMovieRemoved} />
                )}
            </Container>
        </Box>
    );
}

export default MovieLibraryPage;