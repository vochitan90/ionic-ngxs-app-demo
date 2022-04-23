import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { MovieState } from 'src/app/store/state/movies.state';
import { Movie } from '../../models/movie.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  movie: Movie;
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  ionViewWillEnter() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getMovieDetails(id);
  }

  getMovieDetails(id: string) {
    this.store
      .select(MovieState.getMovieById)
      .pipe(map((filterFn) => filterFn(id)))
      .subscribe((movie) => {
        this.movie = movie;
      });
  }
}
