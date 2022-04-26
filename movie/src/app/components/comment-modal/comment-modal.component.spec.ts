import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AngularDelegate,
  IonicModule,
  ModalController,
  NavParams,
} from '@ionic/angular';

import { CommentModalComponent } from './comment-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { MovieState } from '../../store/state/movies.state';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockNavParams {
  data = {};

  get(param) {
    return this.data[param];
  }
}

describe('CommentModalComponent', () => {
  let component: CommentModalComponent;
  let fixture: ComponentFixture<CommentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        [NgxsModule.forRoot([MovieState], { developmentMode: true })],
      ],
      declarations: [CommentModalComponent],
      providers: [
        ModalController,
        AngularDelegate,
        HttpClient,
        { provide: NavParams, useClass: MockNavParams },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
