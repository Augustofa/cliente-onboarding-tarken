import axios from 'axios';
import type { LibraryDto } from "../types/library.types";
import type { MovieDto } from '../types/movie.types';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}`

export const getDefaultLibrary = async (): Promise<LibraryDto | null> => {
    try{
        const response = await axios.get<LibraryDto>(`${API_BASE_URL}/movie-library`);
        return response.data
    } catch(error) {
        console.error("Error searching movie", error);
        return null;
    }
}

export const addMovieToLibrary = async (movie: MovieDto): Promise<String> => {
    try{
        const response = await axios.post<String>(`${API_BASE_URL}/movie-library/add`, movie);
        return response.data
    } catch(error) {
        const errorMessage = `Error saving ${movie.Title} to library`;
        console.error(errorMessage, error);
        return errorMessage;
    }
}

export const removeMovieFromLibrary = async (movie: MovieDto): Promise<String> => {
    try{
        const response = await axios.delete<String>(`${API_BASE_URL}/movie-library/remove/${movie.imdbID}`);
        return response.data
    } catch(error) {
        const errorMessage = `Error removing ${movie.Title} from library`;
        console.error(errorMessage, error);
        return errorMessage;
    }
}