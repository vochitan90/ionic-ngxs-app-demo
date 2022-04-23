export enum Actions {
  FetchMovies = '[Movie] Fetch Movies action',
  //   GetPostDetail = '[Post] Get Post Detail action',
  //   CreatePost = '[Post] Create Post action',
  //   UpdatePost = '[Post] Update Post action',
  //   DeletePost = '[Post] Delete Post action',
}

export class FetchMovies {
  static readonly type = Actions.FetchMovies;

  constructor(public payload: { start: number; end: number }) {}
}
