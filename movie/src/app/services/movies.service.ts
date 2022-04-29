import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from '../models/movie.interface';
import { timeout, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly URL_BASE: string = environment.API_URL_BASE;

  constructor(private http: HttpClient) {}

  getMovies(pageNumber: number): Observable<Movie[]> {
    return (
      this.http
        // Type-checking the response => .get<Movie[]>
        .get<Movie[]>(
          this.URL_BASE +
            `movies?page=${pageNumber}&limit=10&sortBy=createdAt&order=desc`
        )
    );
  }

  getMovie(id: string): Observable<Movie> {
    return (
      this.http
        // Type-checking the response => .get<Movie[]>
        .get<Movie>(this.URL_BASE + `movies/${id}`)
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Movie>(
      encodeURI(this.URL_BASE) + `movies/`,
      movie,
      httpOptions
    );
  }

  editMovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .put<Movie>(
        encodeURI(this.URL_BASE) + `movies/${movie.id}`,
        movie,
        httpOptions
      )
      .pipe(retry(1), timeout(5000));
  }

  deleteMovie(movie: Movie): Observable<Movie> {
    return this.http
      .delete<Movie>(encodeURI(this.URL_BASE) + `movies/${movie.id}`)
      .pipe(retry(1), timeout(5000));
  }
}
