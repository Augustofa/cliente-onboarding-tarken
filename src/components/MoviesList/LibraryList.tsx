import { Grid, Typography } from "@mui/material";
import type { MovieDto } from "../../types/movie.types";
import { ReviewCard } from "./ReviewCard";

interface LibraryListProps {
    movies: MovieDto[];
    onMovieRemoved: (id: string) => void;
    onMovieUpdated: () => void;
}

export const LibraryList: React.FC<LibraryListProps> = ({ movies, onMovieRemoved, onMovieUpdated }) => {
    if(movies.length === 0) {
        return <Typography color="textPrimary">Library is empty.</Typography>
    }

    return (
        <Grid container spacing={3}>
        {movies.map((movie) => (
            <Grid key={movie.imdbID} sx={{display: "flex"}}>
                <ReviewCard movie={movie} onMovieRemoved={onMovieRemoved} onLibraryUpdate={onMovieUpdated}/>
            </Grid>
        ))}
        </Grid>
    );
}