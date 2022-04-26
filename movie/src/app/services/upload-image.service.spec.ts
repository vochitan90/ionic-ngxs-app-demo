import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Cloudinary, CloudinaryConfiguration } from '@cloudinary/angular-5.x';

import { UploadImageService } from './upload-image.service';

describe('UploadImageService', () => {
  let service: UploadImageService;

  let localCloudinary: Cloudinary = new Cloudinary(require('cloudinary-core'), {
    cloud_name: '@@fake_angular2_sdk@@',
  } as CloudinaryConfiguration);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        { provide: Cloudinary, useValue: localCloudinary },
      ],
    });
    service = TestBed.inject(UploadImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
