import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Modal } from 'src/app/models/modal.interface';

@Component({
  selector: 'app-show-comment-modal',
  templateUrl: './show-comment-modal.component.html',
  styleUrls: ['./show-comment-modal.component.css'],
})
export class ShowCommentModalComponent implements OnInit {
  modal: Modal = {
    title: '',
  };

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.modal = { ...this.navParams.data.modalProps };
  }

  dismiss() {
    // Using the injected ModalController this page
    // can "dismiss" itself and pass back data.
    this.modalCtrl.dismiss();
  }
}
