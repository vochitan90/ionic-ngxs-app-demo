import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';

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

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, FilterPipe],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([MovieState], { developmentMode: true }),
        IonicModule.forRoot(),
      ],
      providers: [
        ModalController,
        HttpClientTestingModule,
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
