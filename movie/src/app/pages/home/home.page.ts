import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MovieState } from '../../store/state/movies.state';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.interface';
import { DeleteMovie, FetchMovies } from '../../store/action/movies.actions';
import {
  AlertController,
  IonContent,
  IonInfiniteScroll,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { MovieModalComponent } from '../../components/movie-modal/movie-modal.component';
import { ToastController } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  @Select(MovieState.getMovies) movies$: Observable<Movie[]>;

  pageNumber = 1;

  iconView = 'apps';

  showScrollTop = false;

  constructor(
    private store: Store,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  changeView() {
    this.iconView = this.iconView === 'apps' ? 'list' : 'apps';
  }

  ionViewWillEnter() {
    Network.addListener('networkStatusChange', (status) => {
      console.log('Network status changed', status);
    });

    this.logCurrentNetworkStatus();
  }

  logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();

    if (!status.connected) {
      this.presentToast('No internet connection!', 'danger');
    }

    console.log('Network status:', status);
  };

  ngOnInit(): void {
    this.fetchMovies(this.pageNumber);
  }

  fetchMovies(pageNumber: number) {
    this.store
      .dispatch(new FetchMovies(pageNumber))
      .pipe(
        catchError((error) => {
          //console.log(error);
          return this.presentToast('Can not load movies!', 'danger');
        })
      )
      .subscribe();
  }

  doInfinite(event): void {
    setTimeout(() => {
      event?.target?.complete();
      //this.showSkeleton = true;
      this.pageNumber = this.pageNumber + 1;
      this.showScrollTop = true;
      this.fetchMovies(this.pageNumber);
    }, 500);
  }

  scrollToTop(): void {
    this.content.scrollToTop(2000); // animation
    this.showScrollTop = false;
  }

  public handleMissingImage(event: Event): void {
    (event.target as HTMLImageElement).src =
      'https://wwv.bbtor.net/img/default_thumbnail.svg';
  }

  viewMovieDetails(id: string): void {
    this.router.navigate(['detail', id]);
  }

  async presentModal(componentProps: any, component): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: component,
      componentProps: componentProps,
      cssClass: 'update-movie-modal',
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('data', data);
    }
  }

  addMovie(): void {
    const componentProps = {
      modalProps: { title: 'Add Movie', buttonText: 'Add Movie' },
      option: 'add',
    };
    this.presentModal(componentProps, MovieModalComponent);
  }

  editMovie(movie: Movie): void {
    // map comments property
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

  deleteMovie(movie: Movie): void {
    this.presentAlertConfirm(movie, `Are you sure to delete ${movie.title}?`);
  }

  async presentAlertConfirm(movie, message): Promise<void> {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          id: 'confirm-button',
          handler: async () => {
            this.showLoading();
            await this.store.dispatch(new DeleteMovie(movie)).toPromise();
            this.loadingController.dismiss();
            this.presentToast('Delete successfully!');
          },
        },
      ],
    });

    await alert.present();
  }

  async showLoading(): Promise<void> {
    const loading = await this.loadingController.create({
      spinner: null,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
    });
    await loading.present();
  }

  async presentToast(message: string, color = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      icon: 'information-circle',
      animated: true,
      color: color,
      cssClass: 'movie-modal',
    });
    toast.present();
  }
}
