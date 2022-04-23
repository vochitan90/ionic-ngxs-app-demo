import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AddMovie, EditMovie } from 'src/app/store/action/movies.actions';
import { Modal } from '../../models/modal.interface';

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss'],
})
export class MovieModalComponent implements OnInit {
  modal: Modal = {
    title: '',
    buttonText: '',
  };

  movieForm: FormGroup;

  genres = [{ name: 'Action' }, { name: 'Comedy' }];

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private store: Store,
    public toastController: ToastController
  ) {
    this.createForm();
  }

  createForm() {
    this.movieForm = this.formBuilder.group({
      id: '',
      title: new FormControl('', Validators.required),
      year: new FormControl(new Date().getFullYear(), Validators.required),
      director: new FormControl(''),
      cast: new FormControl(''),
      genre: new FormControl('Action'),
      notes: new FormControl(''),
      poster: new FormControl(''),
    });

    // this.movieForm$ = this.store.select((state) => state.catalog.movieForm);
    // this.movieForm$.subscribe((data) => {
    //   if (data['model'] !== null && data['status'] === 'PENDING') {
    //     // Check if the user has added information about a movie but has not inserted it.
    //     this.movieForm.patchValue(data['model']);
    //   }
    // });
  }

  ngOnInit(): void {
    this.modal = { ...this.navParams.data.modalProps };
    if (this.modal.title === 'Edit Movie') {
      this.movieForm.patchValue(this.modal.movie);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async movieFormSubmit() {
    if (this.navParams.data.option === 'add') {
      this.store.dispatch(new AddMovie(this.movieForm.value));
      this.clearMovieForm();
      this.presentToast('Add successful!');
    } else if (this.navParams.data.option === 'edit') {
      this.store.dispatch(new EditMovie(this.movieForm.value));
      this.presentToast('Update successful!');
    }

    this.dismiss();
  }

  clearMovieForm() {
    this.movieForm.reset();
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
