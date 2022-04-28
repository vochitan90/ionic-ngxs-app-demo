import { Movie } from '../../models/movie.interface';
export enum Actions {
  FetchMovies = '[Movie] Fetch Movies action',
  GetMovieDetail = '[Movie] Get Movie Detail action',
  AddMovie = '[Movie] Add Movie action',
  EditMovie = '[Movie] Edit Movie action',
  DeleteMovie = '[Movie] Delete Movie action',
  LikeMovie = '[Movie] Like Movie action',
  CommentMovie = '[Movie] Comment Movie action',
}

export class FetchMovies {
  static readonly type = Actions.FetchMovies;

  constructor(public pageNumber: number) {}
}

export class GetMovieDetail {
  static readonly type = Actions.GetMovieDetail;

  constructor(public id: string) {}
}

export class AddMovie {
  static readonly type = Actions.AddMovie;

  constructor(public payload: Movie) {}
}

export class EditMovie {
  static readonly type = Actions.EditMovie;

  constructor(public payload: Movie) {}
}

export class DeleteMovie {
  static readonly type = Actions.DeleteMovie;

  constructor(public payload: Movie) {}
}

export class LikeMovie {
  static readonly type = Actions.LikeMovie;

  constructor(public payload: Movie) {}
}

export class CommentMovie {
  static readonly type = Actions.CommentMovie;

  constructor(public payload: Movie) {}
}
