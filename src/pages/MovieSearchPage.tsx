import { useEffect, useState } from "react";
import type { MovieSearchResult } from "../types/movie.types";
import { useDebounce } from "../hooks/useDebounce";
import { searchByTitle } from "../api/movieSearchApi";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { MoviesList } from "../components/MoviesList/MoviesList";

function MovieSearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState<MovieSearchResult[]>([]);
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
        <Container maxWidth="md" sx={{marginTop: 4}}>
            <Typography variant="h3" component="h1" gutterBottom>
                Movie Search
            </Typography>

            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                isLoading={isLoading}
            />

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                    <CircularProgress/>
                </Box>
            ) : (
                <MoviesList movies={movies}/>
            )}
        </Container>
    )
}

export default MovieSearchPage;