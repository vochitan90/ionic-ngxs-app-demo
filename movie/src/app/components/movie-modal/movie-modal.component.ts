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
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UploadImageService } from '../../services/upload-image.service';

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
    public toastController: ToastController,
    private uploadImageService: UploadImageService
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

  async updatePoster() {
    if (this.selectedPhoto) {
      const { secure_url } =
        await this.uploadImageService.uploadImageToCloudinary(
          this.movieForm.value.title,
          this.selectedPhoto
        );

      this.movieForm.patchValue({
        poster: secure_url,
      });
    }
  }

  async movieFormSubmit() {
    await this.updatePoster();
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

  selectedPhoto: string;

  async takePicture() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 60,
    });

    this.selectedPhoto = `data:image/jpeg;base64,${capturedPhoto.base64String}`;
  }
}
