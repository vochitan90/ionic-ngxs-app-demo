export interface Movie {
  id: string;
  title: string;
  year: number;
  director?: string;
  cast?: string;
  genre?: string;
  notes?: string;
  poster?: string;
  videoId?: string;
  genreImage?: string;
  likes?: number;
  rate?: number;
  comments?: string[];
}
