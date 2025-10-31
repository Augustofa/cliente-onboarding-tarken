import { Alert, Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { getDefaultLibrary, removeMovieFromLibrary } from "../../api/movieLibraryApi";
import { createReview, getReviewAudio } from "../../api/movieReviewApi";
import type { MovieDto } from "../../types/movie.types";
import { AudioRecorder } from "./AudioRecorder";
import { BaseCard } from "./BaseCard";

interface MovieCardProps {
    movie: MovieDto;
    onMovieRemoved: (id: string) => void;
}

export const ReviewCard: React.FC<MovieCardProps> = ({ movie, onMovieRemoved }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const hasReview = movie.reviews! && movie.reviews.length > 0;

    const handleRemoveFromLibrary = async () => {
        const response = await removeMovieFromLibrary(movie);
        setMessage(response.toString());
        onMovieRemoved(movie.imdbID);
        setSnackbarOpen(true);
    }

    const playReview = async () => {
        const audioUrl = await getReviewAudio(movie);
        if(audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    const closeSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const saveRecordedReview = async (recordedBuffer: Uint8Array | null) => {
        if (!recordedBuffer) {
            setMessage('No recording available');
            setSnackbarOpen(true);
            return;
        }

        const library = await getDefaultLibrary();
        await createReview({
            file: recordedBuffer,
            movieId: movie.imdbID,
            libraryId: library!.id
        });
        
        setMessage("Review succesufully recorded!");
        setSnackbarOpen(true);
    };

    return (
        <>
        <BaseCard
            movie={movie}
            actions={
                <>
                <Button
                    variant="contained"
                    fullWidth 
                    onClick={handleRemoveFromLibrary}
                    sx={{ textTransform: 'none', backgroundColor: '#d34434ff', '&:hover': { backgroundColor: '#b92110ff' } }}
                >
                    Remove from My Library
                </Button>
                <AudioRecorder onRecordingComplete={saveRecordedReview}>
                    {({ isRecording, toggleRecording }) => (
                        <>
                        <Button
                            variant="contained"
                            fullWidth 
                            onClick={toggleRecording}
                            sx={{ textTransform: 'none', backgroundColor: isRecording ? '#b92110ff' : '#3437d3ff', '&:hover': { backgroundColor: isRecording ? '#a0150cff' : '#1016b9ff' } }}
                        >
                            {isRecording ? 'Stop Recording' : 'Record Review'}
                        </Button>
                        </>
                    )}
                </AudioRecorder>
                </>
            }
            playReview={hasReview ? playReview : undefined}
        >
        </BaseCard>
        
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={closeSnackbar}
                severity="info"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
        </>
    )
}