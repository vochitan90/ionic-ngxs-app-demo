import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AngularDelegate,
  ModalController,
  NavParams,
  IonicModule,
} from '@ionic/angular';
import { UploadImageService } from '../../services/upload-image.service';

import { ShowCommentModalComponent } from './show-comment-modal.component';
import { NgxsModule, Store } from '@ngxs/store';
import { MovieState } from '@app/store/state/movies.state';
import { HttpClient, HttpHandler } from '@angular/common/http';

class MockNavParams {
  data = {};

  get(param) {
    return this.data[param];
  }
}

describe('ShowCommentModalComponent', () => {
  let component: ShowCommentModalComponent;
  let fixture: ComponentFixture<ShowCommentModalComponent>;

  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        NgxsModule.forRoot([MovieState], {
          developmentMode: true,
        }),
      ],
      declarations: [ShowCommentModalComponent],
      providers: [
        UploadImageService,
        ModalController,
        AngularDelegate,
        HttpClient,
        HttpHandler,
        { provide: NavParams, useClass: MockNavParams },
      ],
      //schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
