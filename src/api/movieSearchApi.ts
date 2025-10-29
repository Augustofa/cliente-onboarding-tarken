import type { MovieDto } from "../types/movie.types"
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

export const searchByTitle = async (query: string): Promise<MovieDto[]> => {
    try{
        const response = await axios.get<MovieDto[]>(`${API_BASE_URL}/movie-search`, {
            params: {
                title: query
            }
        });
        return response.data
    } catch(error) {
        console.error("Error searching movie", error);
        return [];
    }
}