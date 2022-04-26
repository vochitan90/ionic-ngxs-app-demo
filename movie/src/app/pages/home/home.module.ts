import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MovieModalComponent } from '../../components/movie-modal/movie-modal.component';

import {
  CloudinaryModule,
  CloudinaryConfiguration,
} from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { UploadImageService } from '@services/upload-image.service';
// import { FilterPipe } from '@pipes/filter.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: 'moonknight',
      upload_preset: 'gwswuquc',
    } as CloudinaryConfiguration),
  ],
  declarations: [HomePage, FilterPipe, MovieModalComponent],
  providers: [UploadImageService],
})
export class HomePageModule {}
