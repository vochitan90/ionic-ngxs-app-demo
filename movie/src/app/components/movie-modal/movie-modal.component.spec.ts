import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AngularDelegate,
  ModalController,
  NavParams,
  IonicModule,
} from '@ionic/angular';
import { NgxsModule, Store } from '@ngxs/store';
import { MovieState } from '../../store/state/movies.state';
import { ShowCommentModalComponent } from '../show-comment-modal/show-comment-modal.component';

import { MovieModalComponent } from './movie-modal.component';
import { Cloudinary, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { AddMovie } from '@app/store/action/movies.actions';

class MockNavParams {
  data = {
    option: 'add',
  };

  get(param) {
    return this.data[param];
  }
}

describe('MovieModalComponent', () => {
  let component: MovieModalComponent;
  let fixture: ComponentFixture<MovieModalComponent>;

  let localCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'), {
    cloud_name: '@@fake_angular2_sdk@@',
  } as CloudinaryConfiguration);

  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([MovieState], {
          developmentMode: true,
        }),
      ],
      declarations: [MovieModalComponent, ShowCommentModalComponent],
      providers: [
        ModalController,
        AngularDelegate,
        HttpClient,
        HttpHandler,
        { provide: NavParams, useClass: MockNavParams },
        { provide: Cloudinary, useValue: localCloudinary },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store);
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should add new movie', async () => {
    jest.spyOn(store, 'dispatch');

    const mockMovie = {
      title: 'After Dark in Central Park',
      year: 1900,
      director: '',
      cast: '',
      genre: 'Action',
      notes:
        'At the opening of this picture, a couple are seen in dim outlines, spooning on a park bench. In comes a policeman, armed with a dark-lantern, which he suddenly flashes on the couple. They cease their love-making, in great confusion, and the policeman walks on, but as soon as he is out of sight, the couple commence billing and cooing again. This picture is particularly interesting because of the photographic effect of the sudden flashing of a dark lantern on the couple. It is very cleverly worked out, and the picture has made a big hit wherever it has been shown.',
      poster:
        'https://in.bmscdn.com/iedb/movies/images/website/poster/large/ela-cheppanu-et00016781-24-03-2017-18-31-40.jpg',
      id: 'f576523c-fe61-441c-ab8d-4e443a3387d2',
    };

    await component.movieForm.patchValue(mockMovie);

    await component.movieFormSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(expect.any(AddMovie));
  });

  // it('should be initialized correctly for the form', () => {
  //   let movieDetail = {
  //     title: 'After Dark in Central Park',
  //     year: 1900,
  //     director: null,
  //     cast: null,
  //     genre: 'Action',
  //     notes:
  //       'At the opening of this picture, a couple are seen in dim outlines, spooning on a park bench. In comes a policeman, armed with a dark-lantern, which he suddenly flashes on the couple. They cease their love-making, in great confusion, and the policeman walks on, but as soon as he is out of sight, the couple commence billing and cooing again. This picture is particularly interesting because of the photographic effect of the sudden flashing of a dark lantern on the couple. It is very cleverly worked out, and the picture has made a big hit wherever it has been shown.',
  //     poster:
  //       'https://in.bmscdn.com/iedb/movies/images/website/poster/large/ela-cheppanu-et00016781-24-03-2017-18-31-40.jpg',
  //     id: 'f576523c-fe61-441c-ab8d-4e443a3387d2',
  //   };
  //   const formControl = component.movieForm;

  //   formControl.patchValue(movieDetail);

  //   expect(formControl.value.title).toEqual(movieDetail.title);
  //   expect(formControl.value.year).toEqual(movieDetail.year);
  // });
});
