import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  LoadingController,
  ModalController,
  NavParams,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Store, Action } from '@ngxs/store';
import { AddMovie, EditMovie } from '../../store/action/movies.actions';
import { Modal } from '../../models/modal.interface';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { UploadImageService } from '@app/services/upload-image.service';
import { Filesystem, Directory } from '@capacitor/filesystem';

import { FileSytemUtil, LocalFile } from '@app/utils/file-system.util';

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss'],
})
export class MovieModalComponent implements OnInit {
  modalProps: any;

  option: string = '';

  movieForm: FormGroup;

  selectedPhoto: string;

  IMAGE_DIR = 'stored-images';

  genres = [
    { name: 'Action' },
    { name: 'Comedy' },
    {
      id: 4,
      name: 'Documentary',
    },
    { id: 5, name: 'Drama' },
    { id: 6, name: 'Fantasy' },
    { id: 7, name: 'Film noir' },
    { id: 8, name: 'Horror' },
    { id: 9, name: 'Romance' },
    {
      id: 10,
      name: 'Science fiction',
    },
    { id: 11, name: 'Westerns' },
  ];

  images: LocalFile[] = [];

  fileSytem = new FileSytemUtil(this.plt, this.loadingController);

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private store: Store,
    public toastController: ToastController,
    private uploadImageService: UploadImageService,
    private loadingController: LoadingController,
    private plt: Platform
  ) {}

  createForm() {
    this.movieForm = this.formBuilder.group({
      id: '',
      title: new FormControl('', Validators.required),
      year: new FormControl(new Date().getFullYear(), Validators.required),
      director: new FormControl(''),
      cast: new FormControl(''),
      genre: new FormControl('Action', Validators.required),
      notes: new FormControl(''),
      poster: new FormControl(''),
    });

    this.fileSytem.loadFiles();
  }

  ngOnInit(): void {
    this.createForm();
    this.modalProps = { ...this.navParams?.data?.modalProps };
    this.option = this.navParams.get('option');

    //this.modal = { ...this.navParams?.data?.modalProps };
    if (this.option === 'edit') {
      this.movieForm.patchValue(this.modalProps.movie);
      // Set image for src
      this.selectedPhoto = this.modalProps.movie?.poster;
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async getImageFromFileSystem() {
    // way 1
    // if (this.selectedPhoto) {
    //   const { secure_url } =
    //     await this.uploadImageService.uploadImageToCloudinary(
    //       this.movieForm.value.title,
    //       this.selectedPhoto
    //     );

    //   this.movieForm.patchValue({
    //     poster: secure_url,
    //   });
    // }

    // way 2: read file from file system

    const fileInfo = await this.fileSytem.loadSingleFileByName(
      this.fileSytem.getFileName
    );

    const { secure_url } =
      await this.uploadImageService.uploadImageToCloudinary(
        this.movieForm.value.title,
        fileInfo
      );

    this.movieForm.patchValue({
      poster: secure_url,
    });
  }

  async movieFormSubmit() {
    this.presentLoading();
    await this.getImageFromFileSystem(); // load image from file system and update poster url
    if (this.option === 'add') {
      await this.store.dispatch(new AddMovie(this.movieForm.value));
      this.clearMovieForm();
      this.loadingController.dismiss();
      this.presentToast('Add successfully!');
    } else {
      await this.store.dispatch(new EditMovie(this.movieForm.value));
      this.loadingController.dismiss();
      this.presentToast('Update successfully!');
    }

    this.modalCtrl.dismiss();
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
    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Processing data please wait ...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true,
    });
    await loading.present();
  }

  async selectImage() {
    this.selectedPhoto = await (await this.fileSytem.selectImage()).base64Data;
  }

  async loadFiles() {
    await this.fileSytem.loadFiles();
    this.images = this.fileSytem.getImages;
  }

  async startUpload(file: LocalFile) {
    //   const response = await fetch(file.data);
    //   const blob = await response.blob();
    //   const formData = new FormData();
    //   formData.append('file', blob, file.name);
    //   this.uploadData(formData);
  }

  // Upload the formData to our API
  async uploadData(formData: FormData) {
    // const loading = await this.loadingController.create({
    //   message: 'Uploading image...',
    // });
    // await loading.present();
    // // Use your own API!
    // const url = 'http://localhost:8888/images/upload.php';
    // this.http
    //   .post(url, formData)
    //   .pipe(
    //     finalize(() => {
    //       loading.dismiss();
    //     })
    //   )
    //   .subscribe((res) => {
    //     if (res['success']) {
    //       this.presentToast('File upload complete.');
    //     } else {
    //       this.presentToast('File upload failed.');
    //     }
    //   });
  }

  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });
    this.loadFiles();
    this.presentToast('File removed.');
  }
}
