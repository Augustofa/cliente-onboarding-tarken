import axios from 'axios';
import type { ReviewDto } from '../types/review.types';
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

export const searchReviewByMovie = async (movieId: string): Promise<ReviewDto[]> => {
    try{
        const response = await axios.get<ReviewDto[]>(`${API_BASE_URL}/movie-review/movie/${movieId}`);
        return response.data
    } catch(error) {
        console.error("Error searching movie", error);
        return [];
    }
}

export const searchReviewByLibrary = async (movieId: string): Promise<ReviewDto[]> => {
    try{
        const response = await axios.get<ReviewDto[]>(`${API_BASE_URL}/movie-review/movie/${movieId}`);
        return response.data
    } catch(error) {
        console.error("Error searching movie", error);
        return [];
    }
}

// Fetches reviews all movies in library and return grouped by movieId
export const searchReviewsByMovies = async (movieIds: string[]): Promise<Record<string, ReviewDto[]>> => {
    try {
        const response = await axios.post<ReviewDto[]>(`${API_BASE_URL}/movie-review/movies`, { movieIds });
        const reviews = response.data || [];

        return reviews.reduce<Record<string, ReviewDto[]>>((acc, r) => {
            const key = (r as any).movie?.imdbID;
            if (!acc[key]) acc[key] = [];
            acc[key].push(r);
            return acc;
        }, {});
    } catch (error) {
        console.error('Error fetching reviews for movies', error);
        return {};
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