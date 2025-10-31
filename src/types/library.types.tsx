import type { MovieDto } from "./movie.types";

export interface LibraryDto {
  id: number;
  name: string;
  movies: MovieDto[];
}