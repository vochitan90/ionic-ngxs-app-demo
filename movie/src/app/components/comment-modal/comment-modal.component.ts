import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Modal } from 'src/app/models/modal.interface';
import { EditMovie } from 'src/app/store/action/movies.actions';
import { MovieState } from 'src/app/store/state/movies.state';
import { CommentMovie } from '../../store/action/movies.actions';
import { Movie } from '../../models/movie.interface';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css'],
})
export class CommentModalComponent implements OnInit {
  commentForm: FormGroup;

  modal: Movie;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private store: Store
  ) {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      //rating: new FormControl(''),
      comment: new FormControl('', Validators.required),
    });
  }

  // ionViewWillEnter(){

  // }

  ngOnInit() {
    //this.modal = { ...this.navParams.data.modalProps };
    this.modal = {
      ...this.store.selectSnapshot(MovieState.getMovieDetail),
    };
    console.log(this.modal);
  }

  dismiss(message: string) {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    this.modalCtrl.dismiss(message);
  }

  async commentFormSubmit() {
    let comments;
    let movieToUpdate = { ...this.modal };
    if (typeof this.modal.comments === 'undefined') {
      comments = [];
    } else {
      comments = [...this.modal.comments];
    }

    // if (typeof this.modal.movie.rate === 'undefined') {
    //   movieToUpdate = {
    //     ...movieToUpdate,
    //     rate: this.commentForm.value.rating,
    //     numVotes: 1,
    //   };
    // } else {
    //   movieToUpdate = {
    //     ...movieToUpdate,
    //     numVotes: movieToUpdate.numVotes + 1,
    //     rate:
    //       (movieToUpdate.rate + this.commentForm.value.rating) /
    //       movieToUpdate.numVotes,
    //   };
    // }

    comments.push(this.commentForm.value.comment);
    movieToUpdate.comments = comments;
    await this.store.dispatch(new CommentMovie(movieToUpdate)).toPromise();

    this.dismiss('added comment');
  }

  onRatingChange(event) {
    this.commentForm.patchValue({ rating: event.detail });
  }
}
