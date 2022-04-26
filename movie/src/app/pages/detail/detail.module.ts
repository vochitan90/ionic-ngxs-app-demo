import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import { CommentModalComponent } from '../../components/comment-modal/comment-modal.component';
import { ShowCommentModalComponent } from '../../components/show-comment-modal/show-comment-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [DetailPage, CommentModalComponent, ShowCommentModalComponent],
})
export class DetailPageModule {}
