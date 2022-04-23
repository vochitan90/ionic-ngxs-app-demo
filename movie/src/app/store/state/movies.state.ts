import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.interface';
import { MoviesService } from 'src/app/services/movies.service';
import { FetchMovies } from '../action/movies.actions';

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
  getTodos(
    { getState, setState, patchState }: StateContext<MoviesStateModel>,
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
}
