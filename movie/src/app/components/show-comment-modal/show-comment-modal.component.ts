import { Component, OnInit } from '@angular/core';
import { Movie } from '@app/models/movie.interface';
import { MovieState } from '@app/store/state/movies.state';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Modal } from '../../models/modal.interface';

@Component({
  selector: 'app-show-comment-modal',
  templateUrl: './show-comment-modal.component.html',
  styleUrls: ['./show-comment-modal.component.css'],
})
export class ShowCommentModalComponent implements OnInit {
  movie: Movie;

  constructor(private modalCtrl: ModalController, private store: Store) {}

  ngOnInit() {
    if (this.store.selectSnapshot(MovieState.getMovieDetail)) {
      this.movie = {
        ...this.store.selectSnapshot(MovieState.getMovieDetail),
      };
    }
  }

  dismiss() {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    this.modalCtrl.dismiss();
  }
}
