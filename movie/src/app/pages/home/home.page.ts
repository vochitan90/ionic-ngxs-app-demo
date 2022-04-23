import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MovieState } from '../../store/state/movies.state';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.interface';
import { FetchMovies } from '../../store/action/movies.actions';
import { IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MovieModalComponent } from 'src/app/components/movie-modal/movie-modal.component';

export type Pagination = {
  start: number;
  end: number;
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  @Select(MovieState.getMovies) movies$: Observable<Movie[]>;

  pagination: Pagination = {
    start: 0,
    end: 20,
  };

  iconView = 'apps';

  showScrollTop = false;

  constructor(
    private store: Store,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  changeView() {
    this.iconView = this.iconView === 'apps' ? 'list' : 'apps';
  }

  ngOnInit(): void {
    this.fetchMovies(this.pagination);
  }

  fetchMovies(pagination: Pagination) {
    this.store.dispatch(new FetchMovies(pagination));
  }

  doInfinite(event) {
    setTimeout(() => {
      event.target.complete();
      //this.showSkeleton = true;
      this.pagination.start = this.pagination.end;
      this.pagination.end += 20;
      this.showScrollTop = true;
      this.fetchMovies(this.pagination);
    }, 500);
  }

  scrollToTop() {
    this.content.scrollToTop(2000); // animation
    this.showScrollTop = false;
  }

  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src =
      'https://wwv.bbtor.net/img/default_thumbnail.svg';
  }

  viewMovieDetails(movie: Movie) {
    this.router.navigate(['detail', movie.id]);
  }

  async presentModal(componentProps: any, component) {
    const modal = await this.modalCtrl.create({
      component: component,
      componentProps: componentProps,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('data', data);
    }
  }

  addMovie() {
    const componentProps = {
      modalProps: { title: 'Add Movie', buttonText: 'Add Movie' },
      option: 'add',
    };
    this.presentModal(componentProps, MovieModalComponent);
  }

  editMovie(movie: Movie) {
    const componentProps = {
      modalProps: {
        title: 'Edit Movie',
        buttonText: 'Edit Movie',
        movie: movie,
      },
      option: 'edit',
    };
    this.presentModal(componentProps, MovieModalComponent);
  }
}
