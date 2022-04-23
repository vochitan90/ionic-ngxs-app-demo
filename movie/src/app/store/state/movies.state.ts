import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch, updateItem, removeItem } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.interface';
import { MoviesService } from 'src/app/services/movies.service';
import {
  FetchMovies,
  AddMovie,
  EditMovie,
  DeleteMovie,
} from '../action/movies.actions';

export class MoviesStateModel {
  movies: Movie[];
}

@State<MoviesStateModel>({
  name: 'catalog',
  defaults: {
    movies: [],
  },
})
@Injectable()
export class MovieState {
  constructor(private moviesService: MoviesService) {}

  @Selector()
  static getMovies(state: MoviesStateModel) {
    return state.movies;
  }

  @Selector()
  static getMovieById(state: MoviesStateModel) {
    return (id: string) => {
      return state.movies.filter((x) => x.id === id)[0]; // only one
    };
  }

  @Action(FetchMovies)
  fetchMovies(
    { getState, patchState }: StateContext<MoviesStateModel>,
    { payload }
  ) {
    const { start, end } = payload;
    return this.moviesService.getMovies(start, end).pipe(
      tap((moviesRes) => {
        const state = getState();
        patchState({
          movies: [...state.movies, ...moviesRes],
        });
      })
    );
  }

  @Action(AddMovie)
  async addMovie(
    { getState, patchState }: StateContext<MoviesStateModel>,
    { payload }
  ): Promise<void> {
    const newMovie = await this.moviesService.addMovie(payload).toPromise();
    const state = getState();
    patchState({
      movies: [...state.movies, newMovie],
    });
  }

  @Action(EditMovie)
  async EditMovie(
    { setState }: StateContext<MoviesStateModel>,
    { payload }
  ): Promise<void> {
    const editMovie = await this.moviesService.editMovie(payload).toPromise();
    setState(
      patch({
        movies: updateItem(
          (movie: Movie) => movie.id === editMovie.id,
          editMovie
        ),
      })
    );
  }

  @Action(DeleteMovie)
  async DeleteMovie(
    { setState }: StateContext<MoviesStateModel>,
    { payload }
  ): Promise<void> {
    debugger;
    const deleteMovie = await this.moviesService
      .deleteMovie(payload)
      .toPromise();
    setState(
      patch({
        movies: removeItem<Movie>((movie) => movie.id === payload.id),
      })
    );
  }
}
