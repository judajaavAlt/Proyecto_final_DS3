export interface Movie {
  id: number;
  title: string;
  release_date: string;
  release_year: number;
  duration: number;
  classification: string;
  rating: number;
  genres: string[];
  synopsis: string;
  poster_url: string;
  hero_poster: string;
  trailer_url: string;
}
