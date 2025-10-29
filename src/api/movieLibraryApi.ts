import axios from 'axios';
import type { LibraryDto } from "../types/library.types";

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