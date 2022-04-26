import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularDelegate, ModalController, NavParams } from '@ionic/angular';
import { NgxsModule, Store } from '@ngxs/store';
import { MovieState } from '../../store/state/movies.state';
import { ShowCommentModalComponent } from '../show-comment-modal/show-comment-modal.component';

import { MovieModalComponent } from './movie-modal.component';

class MockNavParams {
  data = {};

  get(param) {
    return this.data[param];
  }
}

describe('MovieModalComponent', () => {
  let component: MovieModalComponent;
  let fixture: ComponentFixture<MovieModalComponent>;

  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
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
