import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { MovieState } from '../store/state/movies.state';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
import { MoviesService } from '@services/movies.service';
import { environment } from '@environment/environment';

describe('MovieService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  let id = 'aec233c9-b5e2-d312-62a1-7aa733c73420';
  const URL_BASE: string = environment.API_URL_BASE;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([MovieState], {
          developmentMode: true,
        }),
      ],
      providers: [MoviesService],
    });

    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be should return value', (done) => {
    const response = {
      title: "Buffalo Bill's Wild West Parad",
      year: 1900,
      director: null,
      cast: null,
      genre: null,
      notes: null,
      poster:
        'https://in.bmscdn.com/iedb/movies/images/website/poster/large/ela-cheppanu-et00016781-24-03-2017-18-31-40.jpg',
      id: id,
    };

    service
      .getMovie('aec233c9-b5e2-d312-62a1-7aa733c73420')
      .subscribe((res) => {
        expect(res).toEqual(response);
        done();
      });

    const httpRequest = httpMock.expectOne(
      (req: HttpRequest<any>) =>
        req.url.includes(URL_BASE + `movies/${id}`) && req.method === 'GET'
    );
    httpRequest.flush(response);
    httpMock.verify();
  });
});
