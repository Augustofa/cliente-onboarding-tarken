// import { Grid, Typography } from "@mui/material";
// import type { MovieSearchResult } from "../../types/movie.types";
// import { MovieCard } from "./MovieCard";

// interface ResultsListProps {
//     movies: MovieSearchResult[];
// }

// export const MoviesList: React.FC<ResultsListProps> = ({ movies }) => {
//     if(movies.length === 0) {
//         return <Typography>No results found.</Typography>
//     }

//     return (
//         <Grid container spacing={3}>
//             {movies.map((movie) => (
//                 <Grid item xs={12} sm={6} key={movie.imdbID}>
//                     <MovieCard movie={movie} />
//                 </Grid>
//             ))}
//         </Grid>
//     )
// }