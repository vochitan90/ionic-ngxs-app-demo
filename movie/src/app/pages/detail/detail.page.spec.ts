import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { NgxsModule, Store } from '@ngxs/store';
import { MovieState } from '../../store/state/movies.state';

import { DetailPage } from './detail.page';

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPage],
      imports: [
        RouterTestingModule,
        IonicModule.forRoot(),
        NgxsModule.forRoot([MovieState], { developmentMode: true }),
      ],
      providers: [HttpClient, HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
