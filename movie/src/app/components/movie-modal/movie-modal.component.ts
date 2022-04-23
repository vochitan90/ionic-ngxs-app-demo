import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Modal } from '../../models/modal.interface';

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss'],
})
export class MovieModalComponent implements OnInit {
  modal: Modal = {
    title: '',
    buttonText: '',
  };

  movieForm: FormGroup;

  genres = [
    { id: 1, name: 'Action', image: 'assets/movies-genres/action.png' },
    { id: 2, name: 'Comedy', image: 'assets/movies-genres/comedy.png' },
    { id: 3, name: 'Crime', image: 'assets/movies-genres/crime.png' },
    {
      id: 4,
      name: 'Documentary',
      image: 'assets/movies-genres/documentary.png',
    },
    { id: 5, name: 'Drama', image: 'assets/movies-genres/drama.png' },
    { id: 6, name: 'Fantasy', image: 'assets/movies-genres/fantasy.png' },
    { id: 7, name: 'Film noir', image: 'assets/movies-genres/film noir.png' },
    { id: 8, name: 'Horror', image: 'assets/movies-genres/horror.png' },
    { id: 9, name: 'Romance', image: 'assets/movies-genres/romance.png' },
    {
      id: 10,
      name: 'Science fiction',
      image: 'assets/movies-genres/science fiction.png',
    },
    { id: 11, name: 'Westerns', image: 'assets/movies-genres/westerns.png' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private store: Store
  ) {
    this.createForm();
  }

  createForm() {
    this.movieForm = this.formBuilder.group({
      id: '',
      title: new FormControl('', Validators.required),
      year: new FormControl(new Date().getFullYear(), Validators.required),
      director: new FormControl(''),
      cast: new FormControl(''),
      genre: new FormControl('Action'),
      notes: new FormControl(''),
      poster: new FormControl(''),
    });

    // this.movieForm$ = this.store.select((state) => state.catalog.movieForm);
    // this.movieForm$.subscribe((data) => {
    //   if (data['model'] !== null && data['status'] === 'PENDING') {
    //     // Check if the user has added information about a movie but has not inserted it.
    //     this.movieForm.patchValue(data['model']);
    //   }
    // });
  }

  ngOnInit(): void {
    this.modal = { ...this.navParams.data.modalProps };
    if (this.modal.title === 'Edit Form') {
      this.movieForm.patchValue(this.modal.movie);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
