import type { ReviewDto } from "./review.types";

export interface MovieDto {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Rating: number;
  reviews?: ReviewDto[];
}