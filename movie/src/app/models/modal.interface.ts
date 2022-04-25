import { Movie } from './movie.interface';
export interface Modal {
  title: string;
  buttonText?: string;
  movie?: Movie;
}
