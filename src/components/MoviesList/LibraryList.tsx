import { Grid, Typography } from "@mui/material";
import type { MovieDto } from "../../types/movie.types";
import { ReviewCard } from "../MovieCards/ReviewCard";

interface LibraryListProps {
    movies: MovieDto[];
    onMovieUpdated: () => void;
    showMessage: (id: string) => void;
}

export const LibraryList: React.FC<LibraryListProps> = ({ movies, showMessage: showMessage, onMovieUpdated }) => {
    if(movies.length === 0) {
        return <Typography color="textPrimary">Library is empty.</Typography>
    }

    return (
        <Grid container spacing={3}>
        {movies.map((movie) => (
            <Grid key={movie.imdbID} sx={{display: "flex"}}>
                <ReviewCard movie={movie} showMessage={showMessage} onLibraryUpdate={onMovieUpdated}/>
            </Grid>
        ))}
        </Grid>
    );
}