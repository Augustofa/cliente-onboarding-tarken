import { Alert, Button, Snackbar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getDefaultLibrary, removeMovieFromLibrary } from "../../api/movieLibraryApi";
import { createReview, deleteReview, getReviewAudio } from "../../api/movieReviewApi";
import type { MovieDto } from "../../types/movie.types";
import { AudioRecorder } from "../AudioRecorder/AudioRecorder";
import { BaseCard } from "./BaseCard";

interface MovieCardProps {
    movie: MovieDto;
    onMovieRemoved: (id: string) => void;
    onLibraryUpdate: () => void;
}

export const ReviewCard: React.FC<MovieCardProps> = ({ movie, onMovieRemoved, onLibraryUpdate }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [hasReview, setHasReview] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        setHasReview(movie.reviews! && movie.reviews.length > 0);
        if(audioRef.current) {
            audioRef.current.src = '';
            setIsPlaying(false);
        }

        audioRef.current = new Audio();

        const handleEnded = () => setIsPlaying(false);
        const handleError = () => {
            setIsPlaying(false);
            setMessage('Error playing audio');
            setSnackbarOpen(true);
        }

        audioRef.current.addEventListener('ended', handleEnded);
        audioRef.current.addEventListener('error', handleError);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.removeEventListener('error', handleError);
                audioRef.current.pause();
                audioRef.current.src = '';
                audioRef.current = null;
            }
        };
    }, [movie.imdbID]);

    const handleRemoveFromLibrary = async () => {
        const response = await removeMovieFromLibrary(movie);
        setMessage(response.toString());
        setSnackbarOpen(true);
        onMovieRemoved(movie.imdbID);
    }

    const handleDeleteReview = async () => {
        const reviewId = movie.reviews?.[0].id!;
        const response = await deleteReview(reviewId);
        setMessage(response);
        setSnackbarOpen(true);
        onLibraryUpdate();
    };

    const playReview = async () => {
        if(audioRef.current) {
            if(isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                try {
                    const audioUrl = await getReviewAudio(movie);
                    if(!audioUrl) return;

                    audioRef.current.src = audioUrl;
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.error('Error playing audio:', error);
                    setMessage('Error playing audio');
                    setSnackbarOpen(true);
                }
            }
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
        onLibraryUpdate();
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
                {hasReview ? (
                     <Button
                        variant="contained"
                        fullWidth 
                        onClick={handleDeleteReview}
                        sx={{ textTransform: 'none', backgroundColor: '#d34434ff', '&:hover': { backgroundColor: '#b92110ff' } }}
                    >
                        Delete Review
                    </Button>
                ) : (
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
                )}
                </>
            }
            playReview={hasReview ? playReview : undefined}
            isPlaying={isPlaying}
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