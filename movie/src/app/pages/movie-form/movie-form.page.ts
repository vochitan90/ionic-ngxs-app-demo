import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadImageService } from '@app/services/upload-image.service';
import { AddMovie, EditMovie } from '@app/store/action/movies.actions';
import { FileSytemUtil, LocalFile } from '@app/utils/file-system.util';
import { Directory, Filesystem } from '@capacitor/filesystem';
import {
  LoadingController,
  ModalController,
  NavParams,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.page.html',
  styleUrls: ['./movie-form.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFormPage implements OnInit {
  isEditMode = false;

  modalProps: any;

  movieForm: FormGroup;

  option: string = '';

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
    private store: Store,
    public toastController: ToastController,
    private uploadImageService: UploadImageService,
    private loadingController: LoadingController,
    private plt: Platform,
    public route: ActivatedRoute,
    public router: Router,
    public cdr: ChangeDetectorRef
  ) {}

  createForm(): void {
    this.movieForm = this.formBuilder.group({
      id: '',
      title: new FormControl('Test', Validators.required),
      year: new FormControl(new Date().getFullYear(), Validators.required),
      director: new FormControl(''),
      cast: new FormControl(''),
      genre: new FormControl('Action', Validators.required),
      notes: new FormControl(''),
      poster: new FormControl(''),
    });

    //this.fileSytem.loadFiles();
  }

  ngOnInit(): void {
    this.createForm();
    //this.modalProps = { ...this.navParams?.data?.modalProps };
    //this.option = this.navParams.get('option');

    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        const movie = this.router.getCurrentNavigation().extras.state.movie;
        this.movieForm.patchValue(movie);
        // Set image for src
        this.selectedPhoto = movie?.poster;
        this.isEditMode = true;
      } else {
        this.isEditMode = false;
      }
    });

    //this.modal = { ...this.navParams?.data?.modalProps };
    // if (this.option === 'edit') {
    //   this.movieForm.patchValue(this.modalProps.movie);
    //   // Set image for src
    //   this.selectedPhoto = this.modalProps.movie?.poster;
    // }
  }

  async getImageFromFileSystem(): Promise<void> {
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

    if (this.fileSytem.getFileName) {
      const fileInfo = await this.fileSytem.loadSingleFileByName(
        this.fileSytem.getFileName
      );

      const { secure_url } =
        await this.uploadImageService.uploadImageToCloudinary(
          this.fileSytem.getFileName,
          fileInfo
        );

      this.movieForm.patchValue({
        poster: secure_url,
      });
    }
  }

  async movieFormSubmit() {
    await this.presentLoading();

    await this.getImageFromFileSystem(); // load image from file system and update poster url
    if (!this.isEditMode) {
      await this.store.dispatch(new AddMovie(this.movieForm.value));
      this.clearMovieForm();
      await this.loadingController.dismiss();
      await this.presentToast('Added successfully!');
    } else {
      await this.store.dispatch(new EditMovie(this.movieForm.value));

      await this.loadingController.dismiss();
      await this.presentToast('Updated successfully!');
    }

    //this.modalCtrl.dismiss();
  }

  clearMovieForm() {
    this.movieForm.reset();
  }

  async presentToast(message: string): Promise<void> {
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

  async presentLoading(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Processing data please wait ...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true,
    });
    await loading.present();
  }

  async selectImage(): Promise<void> {
    debugger;
    this.selectedPhoto = await (await this.fileSytem.selectImage()).base64Data;

    if (this.isEditMode && this.selectedPhoto) {
      // delete the old one
      const posterValue = this.movieForm.get('poster').value;
      const getFileName = posterValue.substring(
        posterValue.lastIndexOf('/') + 1
      );

      // check if the file exist in file system or not

      const fileInfo = await this.fileSytem.loadSingleFileByName(getFileName);
      if (fileInfo) {
        await Filesystem.deleteFile({
          directory: Directory.Data,
          path: this.IMAGE_DIR + '/' + getFileName,
        });
      }
    }

    debugger;
    this.cdr.markForCheck();
  }

  async loadFiles(): Promise<void> {
    await this.fileSytem.loadFiles();
    this.images = this.fileSytem.getImages;
    this.cdr.markForCheck();
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

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
