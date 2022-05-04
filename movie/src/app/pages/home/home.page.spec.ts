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
import { MovieModalComponent } from '@app/components/movie-modal/movie-modal.component';

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
      providers: [
        {
          provide: ModalController,
          useValue: {
            create: () => Promise.resolve(),
            present: () => Promise.resolve(),
          },
        },
      ],
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
  //   const pageNumber = 1;
  //   jest.spyOn(component, 'fetchMovies');
  //   jest.spyOn(store, 'dispatch');

  //   component.ngOnInit();

  //   expect(component.fetchMovies).toHaveBeenCalled();

  //   expect(store.dispatch).toHaveBeenCalledWith(new FetchMovies(1));
  // });

  // it('should load more movies when scroll down', () => {
  //   const pageNumber = 2;

  //   jest.useFakeTimers();
  //   jest.spyOn(global, 'setTimeout');

  //   jest.spyOn(component, 'doInfinite');

  //   jest.spyOn(component, 'fetchMovies');

  //   jest.spyOn(store, 'dispatch');

  //   component.doInfinite(null); // set null or true is acceptable

  //   expect(component.showScrollTop).toBeFalsy();

  //   jest.advanceTimersByTime(500);

  //   expect(component.showScrollTop).toBeTruthy();

  //   expect(setTimeout).toHaveBeenCalledTimes(1);
  //   expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);

  //   expect(component.doInfinite).toHaveBeenCalled();
  //   expect(store.dispatch).toHaveBeenCalledWith(new FetchMovies(pageNumber));
  // });

  it('should show modal when click add', () => {
    const componentProps = {
      modalProps: { title: 'Add Movie', buttonText: 'Add Movie' },
      option: 'add',
    };
    const mockModal = {
      component: MovieModalComponent,
      componentProps: componentProps,
      cssClass: 'update-movie-modal',
    };
    jest.spyOn(TestBed.inject(ModalController), 'create');
    jest.spyOn(component, 'addMovie');

    component.addMovie();

    expect(component.addMovie).toHaveBeenCalledTimes(1);
    expect(TestBed.inject(ModalController).create).toHaveBeenCalledWith(
      mockModal
    );
  });

  it('should show modal when click edit', () => {
    const movie = {
      cast: 'Rocky',
      comments: [],
      createdAt: 1651641648,
      director: 'James',
      genre: 'Action',
      id: '64',
      likes: 0,
      notes: 'Nice',
      poster:
        'https://res.cloudinary.com/moonknight/image/upload/v1651646102/thor%203_6d1d97f8-6282-4611-9958-10d815b8a09e.jpg',
      title: 'thor 3',
      year: 2024,
    };
    const componentProps = {
      modalProps: {
        title: 'Edit Movie',
        buttonText: 'Edit Movie',
        movie: movie,
      },
      option: 'edit',
    };
    const mockModal = {
      component: MovieModalComponent,
      componentProps: componentProps,
      cssClass: 'update-movie-modal',
    };
    jest.spyOn(TestBed.inject(ModalController), 'create');
    jest.spyOn(component, 'editMovie');

    component.editMovie(movie);

    expect(component.editMovie).toHaveBeenCalledTimes(1);
    expect(TestBed.inject(ModalController).create).toHaveBeenCalledWith(
      mockModal
    );
  });
});
