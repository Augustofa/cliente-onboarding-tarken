import { Grid, Typography } from "@mui/material";
import type { MovieDto } from "../../types/movie.types";
import { MovieCard } from "./MovieCard";

interface ResultsListProps {
    movies: MovieDto[];
}

export const MoviesList: React.FC<ResultsListProps> = ({ movies }) => {
    if(movies.length === 0) {
        return <Typography color="textPrimary">No results found.</Typography>
    }

    return (
        <Grid container spacing={3}>
        {movies.map((movie) => (
            <Grid key={movie.imdbID} sx={{display: "flex"}}>
                <MovieCard movie={movie} />
            </Grid>
        ))}
        </Grid>
    );
}