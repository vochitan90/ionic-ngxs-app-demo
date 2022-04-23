import { Movie } from '../../models/movie.interface';
export enum Actions {
  FetchMovies = '[Movie] Fetch Movies action',
  //   GetPostDetail = '[Post] Get Post Detail action',
  AddMovie = '[Movie] Add Movie action',
  EditMovie = '[Movie] Edit Movie action',
  DeleteMovie = '[Movie] Delete Movie action',
}

export class FetchMovies {
  static readonly type = Actions.FetchMovies;

  constructor(public payload: { start: number; end: number }) {}
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
