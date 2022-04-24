import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetMovieDetail, LikeMovie } from 'src/app/store/action/movies.actions';
import { MovieState } from 'src/app/store/state/movies.state';
import { Movie } from '../../models/movie.interface';
import { ModalController, ToastController } from '@ionic/angular';
import { CommentModalComponent } from 'src/app/components/comment-modal/comment-modal.component';
import { ShowCommentModalComponent } from 'src/app/components/show-comment-modal/show-comment-modal.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  @Select(MovieState.getMovieDetail)
  movieDetail$: Observable<Movie>;

  movie: Movie;
  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  async ionViewWillEnter() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    await this.store.dispatch(new GetMovieDetail(id)).toPromise();
    this.movie = { ...this.store.selectSnapshot(MovieState.getMovieDetail) };
  }

  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src =
      'https://wwv.bbtor.net/img/default_thumbnail.svg';
  }

  onClickLike() {
    console.log('DetailsPage::onClickLike');
    if (typeof this.movie.likes === 'undefined') {
      this.movie.likes = 0;
    }
    this.movie.likes += 1;
    this.store.dispatch(new LikeMovie(this.movie));
  }

  onClickComment() {
    console.log('DetailsPage::onClickComment');
    const componentProps = {
      modalProps: { title: 'Comment', movie: this.movie },
    };
    this.presentModal(componentProps, CommentModalComponent);
  }

  onClickShowComment() {
    console.log('DetailsPage::onClickShowComment');
    const componentProps = {
      modalProps: { title: 'Comments', movie: this.movie },
    };
    this.presentModal(componentProps, ShowCommentModalComponent);
  }

  async presentModal(componentProps: any, component) {
    console.log(
      'DetailsPage::presentModal | method called -> movie',
      this.movie
    );
    // const componentProps = { modalProps: { item: this.movie}};
    const modal = await this.modalCtrl.create({
      component: component,
      componentProps: componentProps,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data === 'added comment') {
      this.presentToast('Added comment successully!');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      icon: 'information-circle',
      animated: true,
      color: 'success',
      cssClass: 'movie-modal',
    });
    toast.present();
  }
}
