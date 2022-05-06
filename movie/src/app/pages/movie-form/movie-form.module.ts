import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieFormPageRoutingModule } from './movie-form-routing.module';

import { MovieFormPage } from './movie-form.page';
import {
  CloudinaryConfiguration,
  CloudinaryModule,
} from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { UploadImageService } from '@app/services/upload-image.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MovieFormPageRoutingModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: 'moonknight',
      upload_preset: 'gwswuquc',
    } as CloudinaryConfiguration),
  ],
  declarations: [MovieFormPage],
  providers: [UploadImageService],
})
export class MovieFormPageModule {}
