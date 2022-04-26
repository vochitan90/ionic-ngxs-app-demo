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

class MockNavParams {
  data = {};

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
