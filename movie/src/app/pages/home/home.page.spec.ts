import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { NgxsModule, Store } from '@ngxs/store';

import { HomePage } from './home.page';
import { MovieState } from '../../store/state/movies.state';
import { RouterTestingModule } from '@angular/router/testing';
// import { FilterPipe } from '@pipes/filter.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

jest.useRealTimers();

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, FilterPipe],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([MovieState], { developmentMode: true }),
        IonicModule.forRoot(),
      ],
      providers: [ModalController, HttpClient, HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    jest.useFakeTimers('legacy');
    expect(component).toBeTruthy();
  });
});
