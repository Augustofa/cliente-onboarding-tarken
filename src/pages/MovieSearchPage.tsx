import { useEffect, useState } from "react";
import type { MovieDto } from "../types/movie.types";
import { useDebounce } from "../hooks/useDebounce";
import { searchByTitle } from "../api/movieSearchApi";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { MoviesList } from "../components/MoviesList/MoviesList";
import { Header } from "../components/Header/Header";

function MovieSearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState<MovieDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        const performSearch = async () => {
            if(debouncedSearchTerm) {
                setIsLoading(true);
                const results = await searchByTitle(debouncedSearchTerm);
                setMovies(results);
                setIsLoading(false);
            } else {
                setMovies([]);
            }
        }

        performSearch();
    }, [debouncedSearchTerm]);

    return (
        <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', minWidth: '100vh' }}>
            <Header />
            <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
                <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'medium', color: '#333' }}>
                    Search
                </Typography>
                
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                <SearchBar 
                    value={searchTerm} 
                    onChange={setSearchTerm} 
                    isLoading={isLoading} 
                    sx={{ maxWidth: 600 }}
                />
                </Box>
                
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <MoviesList movies={movies} />
                )}
            </Container>
        </Box>
    );
}

export default MovieSearchPage;