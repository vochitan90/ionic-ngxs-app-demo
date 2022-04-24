import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetMovieDetail, LikeMovie } from 'src/app/store/action/movies.actions';
import { MovieState } from 'src/app/store/state/movies.state';
import { Movie } from '../../models/movie.interface';
import { MoviesStateModel } from '../../store/state/movies.state';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  @Select(MovieState.getMovieDetail)
  movieDetail$: Observable<Movie>;

  movie: Movie;
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  ionViewWillEnter() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(new GetMovieDetail(id));
  }

  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src =
      'https://wwv.bbtor.net/img/default_thumbnail.svg';
  }

  onClickLike() {
    this.movie = { ...this.store.selectSnapshot(MovieState.getMovieDetail) };
    console.log('DetailsPage::onClickLike');
    if (typeof this.movie.likes === 'undefined') {
      this.movie.likes = 0;
    }
    this.movie.likes += 1;
    this.store.dispatch(new LikeMovie(this.movie));
  }
}
