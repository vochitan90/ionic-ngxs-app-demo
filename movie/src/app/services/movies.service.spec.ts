import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { MoviesService } from './movies.service';
import { MovieState } from '../store/state/movies.state';

describe('MovieService', () => {
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MovieState], { developmentMode: true })],
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
