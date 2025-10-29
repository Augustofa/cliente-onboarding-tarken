import { Star } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { MovieDto } from "../../types/movie.types";

interface MovieCardProps {
    movie: MovieDto;
    actions: React.ReactNode;
}

export const BaseCard: React.FC<MovieCardProps> = ({ movie, actions }) => {
    const rating = '8.2';

    return (
        <Card 
            sx={{ 
                width: 250,
                height: '100%',
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                borderRadius: 2,
                overflow: 'hidden',
            }}
        >
            <CardMedia
                component="img"
                height="350"
                image={movie.Poster !== 'N/A' ? movie.Poster : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                alt={movie.Title}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                backgroundColor: '#fff',
            }}>
                <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div"
                    sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2', 
                    WebkitBoxOrient: 'vertical',
                    fontWeight: 'bold',
                    }}
                >
                    {movie.Title}
                </Typography>
                <Box sx={{
                    position: 'relative', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    width: '100%',
                    mb: 2, 
                    color: 'text.secondary',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2">{movie.Year}</Typography>
                        <Typography variant="body2" sx={{ mx: 0.5 }}>•</Typography> 
                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {movie.Type}
                        </Typography>
                    </Box>

                    <Box sx={{
                        position: 'absolute',
                        right: 0,
                        display: 'flex', 
                        alignItems: 'center',
                        mr: 1,
                        }}
                    >
                        <Star sx={{ color: 'orange', fontSize: '1.2rem', mr: 0.5 }} />
                        <Typography variant="body2">{rating}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {actions}
                </Box>
            </CardContent>
        </Card>
    );
}