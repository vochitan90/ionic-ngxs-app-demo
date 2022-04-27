import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MovieState } from './movies.state';
import { AddMovie } from '../action/movies.actions';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '@environment/environment';
import { MoviesService } from '@app/services/movies.service';
import { of } from 'rxjs';

describe('MovieState', () => {
  let store: Store;

  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([MovieState], {
          developmentMode: !environment.production,
        }),
      ],
    });

    store = TestBed.inject(Store);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should add movies successfully', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const mockMovie = {
      title: 'After Dark in Central Park',
      year: 1900,
      director: '',
      cast: '',
      genre: 'Action',
      notes:
        'At the opening of this picture, a couple are seen in dim outlines, spooning on a park bench. In comes a policeman, armed with a dark-lantern, which he suddenly flashes on the couple. They cease their love-making, in great confusion, and the policeman walks on, but as soon as he is out of sight, the couple commence billing and cooing again. This picture is particularly interesting because of the photographic effect of the sudden flashing of a dark lantern on the couple. It is very cleverly worked out, and the picture has made a big hit wherever it has been shown.',
      poster:
        'https://in.bmscdn.com/iedb/movies/images/website/poster/large/ela-cheppanu-et00016781-24-03-2017-18-31-40.jpg',
      id: 'f576523c-fe61-441c-ab8d-4e443a3387d2',
    };

    jest
      .spyOn(TestBed.inject(MoviesService), 'addMovie')
      .mockReturnValueOnce(of(mockMovie));

    await store.dispatch(new AddMovie(mockMovie));

    const listMovie = store.selectSnapshot(MovieState.getMovies);

    console.log(listMovie);

    expect(listMovie).toBeDefined();
  });
});
