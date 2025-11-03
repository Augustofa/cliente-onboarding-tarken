import axios from 'axios';
import type { MovieDto } from '../types/movie.types';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}`

export const createReview = async (params: { file: Uint8Array; movieId: string; libraryId: number }) => {
    try{
        const bufferArray = new Uint8Array(params.file);
        const blob = new Blob([bufferArray], { type: 'audio/webm' });
        const form = new FormData();
        form.append('file', blob, `${params.movieId}-${Date.now()}.webm`);
        form.append('movieId', params.movieId);
        form.append('libraryId', String(params.libraryId));

        const response = await axios.post(`${API_BASE_URL}/movie-review`, form, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch(error) {
        const errorMessage = `Error saving review`;
        console.error(errorMessage, error);
        return errorMessage;
    }
}

export const getReviewAudio = async (movie: MovieDto): Promise<string | null> => {
    const reviewId = movie.reviews?.[0]?.id;
    try {
        const response = await axios.get(`${API_BASE_URL}/movie-review/audio/${reviewId}`);
        return response.data.audioUrl;
    } catch (error) {
        console.error("Error fetching audio review", error);
        return null;
    }
}

export const deleteReview = async (reviewId: string): Promise<string> => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/movie-review/${reviewId}`);
        return response.data;
    } catch (error) {
        const errorMsg = "Error fetching audio review";
        console.error(errorMsg, error);
        return errorMsg;
    }
}