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
import { Router } from '@angular/router';
import { FetchMovies } from '@app/store/action/movies.actions';

jest.useRealTimers();

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let movieId = 'f576523c-fe61-441c-ab8d-4e443a3387d2';
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, FilterPipe],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([MovieState], { developmentMode: true }),
        IonicModule.forRoot(),
      ],
      providers: [ModalController],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should go to movie detail when call function', async () => {
  //   jest.spyOn(TestBed.inject(Router), 'navigate');

  //   await component.viewMovieDetails(movieId);

  //   expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith([
  //     'detail',
  //     movieId,
  //   ]);
  // });

  // it('should load movies on ngOnInit', async () => {
  //   jest.spyOn(store, 'dispatch');

  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   await fixture.whenStable();

  //   expect(store.dispatch).toHaveBeenCalledWith(
  //     new FetchMovies({ start: 0, end: 20 })
  //   );
  // });
});
