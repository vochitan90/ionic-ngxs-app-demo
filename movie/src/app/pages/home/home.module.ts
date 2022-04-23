import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FilterPipe } from '../../pipes/filter.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { MovieModalComponent } from 'src/app/components/movie-modal/movie-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  declarations: [HomePage, FilterPipe, MovieModalComponent],
})
export class HomePageModule {}
