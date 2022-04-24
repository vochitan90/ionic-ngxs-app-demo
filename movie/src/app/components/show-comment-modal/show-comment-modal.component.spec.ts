import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCommentModalComponent } from './show-comment-modal.component';

describe('ShowCommentModalComponent', () => {
  let component: ShowCommentModalComponent;
  let fixture: ComponentFixture<ShowCommentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCommentModalComponent ]
    })
    .compileComponents();
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
