import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.interface';
import { timeout, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
}
