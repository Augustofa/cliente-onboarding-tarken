import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getDefaultLibrary, removeMovieFromLibrary } from "../../api/movieLibraryApi";
import { createReview, deleteReview, getReviewAudio } from "../../api/movieReviewApi";
import type { MovieDto } from "../../types/movie.types";
import { AudioRecorder } from "../AudioRecorder/AudioRecorder";
import { BaseCard } from "./BaseCard";

interface MovieCardProps {
    movie: MovieDto;
    showMessage: (message: string) => void;
    onLibraryUpdate: () => void;
}

export const ReviewCard: React.FC<MovieCardProps> = ({ movie, showMessage: showMessage, onLibraryUpdate }) => {
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
            showMessage('Error playing audio');
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
        showMessage(response.toString());
        onLibraryUpdate();
    }

    const handleDeleteReview = async () => {
        const reviewId = movie.reviews?.[0].id!;
        const response = await deleteReview(reviewId);
        showMessage(response);
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
                    showMessage('Error playing audio');
                }
            }
        }

        
    };

    const saveRecordedReview = async (recordedBuffer: Uint8Array | null) => {
        if (!recordedBuffer) {
            showMessage('No recording available');
            return;
        }

        const library = await getDefaultLibrary();
        await createReview({
            file: recordedBuffer,
            movieId: movie.imdbID,
            libraryId: library!.id
        });
        
        showMessage("Review succesufully recorded!");
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
        </>
    )
}