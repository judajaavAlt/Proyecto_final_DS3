export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  releaseYear: number;
  duration: number;
  classification: string;
  rating: number;
  genres: string[];
  synopsis: string;
  posterUrl: string;
  heroposter: string;
}
