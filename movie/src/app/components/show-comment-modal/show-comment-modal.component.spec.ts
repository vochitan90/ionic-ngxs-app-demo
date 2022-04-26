import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularDelegate, ModalController, NavParams } from '@ionic/angular';
import { UploadImageService } from '../../services/upload-image.service';

import { ShowCommentModalComponent } from './show-comment-modal.component';

class MockNavParams {
  data = {};

  get(param) {
    return this.data[param];
  }
}

describe('ShowCommentModalComponent', () => {
  let component: ShowCommentModalComponent;
  let fixture: ComponentFixture<ShowCommentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowCommentModalComponent],
      providers: [
        UploadImageService,
        ModalController,
        AngularDelegate,
        { provide: NavParams, useClass: MockNavParams },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
