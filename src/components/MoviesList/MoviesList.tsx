import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getDefaultLibrary } from "../../api/movieLibraryApi";
import type { MovieDto } from "../../types/movie.types";
import { SearchCard } from "../MovieCards/SearchCard";

interface ResultsListProps {
    movies: MovieDto[];
}

export const MoviesList: React.FC<ResultsListProps> = ({ movies }) => {
    const [movieLibrary, setMovieLibrary] = useState<MovieDto[]>();

    useEffect(() => {
        fetchMovieLibrary();
    })

    const fetchMovieLibrary = async () => {
        const library = await getDefaultLibrary();
        setMovieLibrary(library?.movies);
    }

    if(movies.length === 0) {
        return <Typography color="textPrimary">No results found.</Typography>
    }

    return (
        <Grid container spacing={3}>
        {movies.map((movie) => (
            <Grid key={movie.imdbID} sx={{display: "flex"}}>
                <SearchCard movie={movie} isInLibrary={(movieLibrary?.find(libraryMovie => libraryMovie.imdbID === movie.imdbID) !== undefined)}/>
            </Grid>
        ))}
        </Grid>
    );
}