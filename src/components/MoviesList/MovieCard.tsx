import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { MovieSearchResult } from "../../types/movie.types";

interface MovieCardProps {
    movie: MovieSearchResult;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Card 
            sx={{ 
                width: 250,
                height: '100%',
            }}
        >
            <CardMedia
                component="img"
                height="350"
                image={movie.Poster !== 'N/A' ? movie.Poster : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                alt={movie.Title}
            />
            <CardContent>
                <Typography 
                    gutterBottom
                    variant="h6" 
                    component="div"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {movie.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {movie.Year} ({movie.Type})
                </Typography>
            </CardContent>
        </Card>
    )
}