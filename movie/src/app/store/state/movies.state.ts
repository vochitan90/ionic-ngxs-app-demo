import { Movie } from './../../models/movie.interface';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch, updateItem, removeItem } from '@ngxs/store/operators';
import { catchError, tap } from 'rxjs/operators';
import { MoviesService } from '../../services/movies.service';
import {
  FetchMovies,
  AddMovie,
  EditMovie,
  DeleteMovie,
  GetMovieDetail,
  LikeMovie,
  CommentMovie,
} from '../action/movies.actions';
import { produce } from 'immer';
import { of } from 'rxjs';
import { ImmutableSelector, ImmutableContext } from '@ngxs-labs/immer-adapter';

export interface MoviesStateModel {
  movies: Movie[];
  movieDetail: Movie;
}

@State<MoviesStateModel>({
  name: 'catalog',
  defaults: {
    movies: [],
    movieDetail: null,
  },
})
@Injectable()
export class MovieState {
  constructor(private moviesService: MoviesService) {}

  @Selector()
  //@ImmutableSelector()
  static getMovies(state: MoviesStateModel) {
    return state.movies;
  }

  @Selector()
  //@ImmutableSelector()
  static getMovieDetail(state: MoviesStateModel) {
    return state.movieDetail;
  }

  @Action(GetMovieDetail)
  //@ImmutableContext()
  async getMovieDetail(
    { patchState }: StateContext<MoviesStateModel>,
    { id }
  ): Promise<void> {
    const movieDetail = await this.moviesService.getMovie(id).toPromise();
    patchState({
      movieDetail: { ...movieDetail },
    });
  }

  @Action(FetchMovies)
  //@ImmutableContext()
  async fetchMovies(
    { getState, patchState }: StateContext<MoviesStateModel>,
    { pageNumber }
  ) {
    await this.moviesService
      .getMovies(pageNumber)
      .pipe(
        tap((moviesRes) => {
          console.log(moviesRes);
          const state = getState();
          patchState({
            movies: [...state.movies, ...moviesRes],
          });
        })
      )
      .toPromise();
  }

  @Action(AddMovie)
  //@ImmutableContext()
  async addMovie(
    { getState, patchState }: StateContext<MoviesStateModel>,
    { payload }
  ): Promise<void> {
    payload.likes = 0;
    payload.comments = [];
    const newMovie = await this.moviesService.addMovie(payload).toPromise();
    newMovie.likes = 0;
    newMovie.comments = [];
    const state = getState();
    patchState({
      movies: [newMovie, ...state.movies],
    });
  }

  @Action(EditMovie)
  //@ImmutableContext()
  async EditMovie(
    { setState, patchState, getState }: StateContext<MoviesStateModel>,
    { payload }
  ): Promise<void> {
    const state = getState();
    if (state.movieDetail) {
      const { likes, comments } = state.movieDetail;
      payload.likes = likes;
      if (comments) {
        payload.comments = comments;
      }
    }

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

  // @Action(LikeMovie)
  // async LikeMovie(
  //   { getState, setState, patchState }: StateContext<MoviesStateModel>,
  //   { payload }
  // ): Promise<void> {
  //   const likeMovie = await this.moviesService.editMovie(payload).toPromise();
  //   // setState(
  //   //   patch({
  //   //     movies: updateItem(
  //   //       (movie: Movie) => movie.id === likeMovie.id,
  //   //       likeMovie
  //   //     ),
  //   //     movieList: updateItem(
  //   //       (movie: Movie) => movie.id === likeMovie.id,
  //   //       likeMovie
  //   //     ),
  //   //   })
  //   // );

  //   const state = getState();
  //   const findIndex = state.movies.findIndex(
  //     (movie: Movie) => movie.id === likeMovie.id
  //   );
  //   const movieList = [...state.movies];
  //   movieList[findIndex] = likeMovie;

  //   patchState({
  //     movies: movieList,
  //     movieDetail: likeMovie,
  //   });
  // }

  @Action(LikeMovie)
  //@ImmutableContext()
  async LikeMovie(
    { getState, setState, patchState }: StateContext<MoviesStateModel>,
    { payload }
  ): Promise<void> {
    //const likeMovie = await this.moviesService.editMovie(payload).toPromise();

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

    // Way 2

    const likeMovie = await this.moviesService.editMovie(payload).toPromise();
    const updateLike = produce(getState(), (draft: MoviesStateModel) => {
      console.log(draft);
      const findIndex = draft.movies.findIndex(
        (movie: Movie) => movie.id === likeMovie.id
      );

      draft.movies[findIndex] = likeMovie;
      draft.movieDetail = likeMovie;
    });

    setState(updateLike);

    // const state = getState();
    // const findIndex = state.movies.findIndex(
    //   (movie: Movie) => movie.id === likeMovie.id
    // );
    // const movieList = [...state.movies];
    // movieList[findIndex] = likeMovie;

    // patchState({
    //   movies: movieList,
    //   movieDetail: likeMovie,
    // });
  }

  @Action(CommentMovie)
  //@ImmutableContext()
  async CommentMovie(
    { getState, patchState }: StateContext<MoviesStateModel>,
    { payload }
  ): Promise<void> {
    const commentMovie = await this.moviesService
      .editMovie(payload)
      .toPromise();
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
      (movie: Movie) => movie.id === commentMovie.id
    );
    const movieList = [...state.movies];
    movieList[findIndex] = commentMovie;

    patchState({
      movies: movieList,
      movieDetail: commentMovie,
    });
  }

  @Action(DeleteMovie)
  //@ImmutableContext()
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
