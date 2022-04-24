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
  GetMovieDetail,
  LikeMovie,
} from '../action/movies.actions';

export interface MoviesStateModel {
  movies: Movie[];
  movies1: Movie[];
  movieDetail: Movie;
}

@State<MoviesStateModel>({
  name: 'catalog',
  defaults: {
    movies: [],
    movies1: [],
    movieDetail: null,
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
  static getMovieDetail(state: MoviesStateModel) {
    return state.movieDetail;
  }

  @Action(GetMovieDetail)
  async getMovieDetail(
    { getState, patchState }: StateContext<MoviesStateModel>,
    { id }
  ): Promise<void> {
    const movieDetail = await this.moviesService.getMovie(id).toPromise();
    patchState({
      movieDetail: { ...movieDetail },
    });
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
    { setState, patchState }: StateContext<MoviesStateModel>,
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

    patchState({
      movieDetail: editMovie,
    });
  }

  @Action(LikeMovie)
  async LikeMovie(
    { getState, setState, patchState }: StateContext<MoviesStateModel>,
    { payload }
  ): Promise<void> {
    const likeMovie = await this.moviesService.editMovie(payload).toPromise();
    // setState(
    //   patch({
    //     movies: updateItem(
    //       (movie: Movie) => movie.id === likeMovie.id,
    //       likeMovie
    //     ),
    //     movieList: updateItem(
    //       (movie: Movie) => movie.id === likeMovie.id,
    //       likeMovie
    //     ),
    //   })
    // );

    const state = getState();
    const findIndex = state.movies.findIndex(
      (movie: Movie) => movie.id === likeMovie.id
    );
    const movieList = [...state.movies];
    movieList[findIndex] = likeMovie;

    patchState({
      movies: movieList,
      movieDetail: likeMovie,
    });
  }

  @Action(DeleteMovie)
  async DeleteMovie(
    { setState }: StateContext<MoviesStateModel>,
    { payload }
  ): Promise<void> {
    await this.moviesService.deleteMovie(payload).toPromise();
    setState(
      patch({
        movies: removeItem<Movie>((movie) => movie.id === payload.id),
      })
    );
  }
}
