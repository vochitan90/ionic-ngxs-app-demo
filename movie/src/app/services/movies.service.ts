import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.interface';
import { timeout, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly URL_BASE: string = environment.API_URL_BASE;

  constructor(private http: HttpClient) {}

  getMovies(start: number, end: number): Observable<Movie[]> {
    return (
      this.http
        // Type-checking the response => .get<Movie[]>
        .get<Movie[]>(
          this.URL_BASE +
            `movies?_start=${start}&_end=${end}&_sort=year,title&_order=desc,asc`
        )
        .pipe(retry(1), timeout(5000))
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    movie['id'] = uuidv4();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<Movie>(encodeURI(this.URL_BASE) + `movies/`, movie, httpOptions)
      .pipe(retry(1), timeout(5000));
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
