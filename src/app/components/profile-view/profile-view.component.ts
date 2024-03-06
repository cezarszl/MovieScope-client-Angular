import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FetchApiDataService } from '../../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
})
export class ProfileViewComponent implements OnInit {
  username: any;
  movies: any[] = [];
  favouriteMovies: any[] = [];
  profileForm = new FormGroup({
    username: new FormControl<string>(''),
    password: new FormControl<string>(''),
    email: new FormControl<string>(''),
    birthday: new FormControl<string>(''),
  });
  constructor(
    private FetchApiDataService: FetchApiDataService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize form with user data
    this.profileForm = this.formBuilder.group({
      username: [''],
      password: [''],
      email: [''],
      birthday: [''],
    });

    // Fetch user data and populate form
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.profileForm.patchValue({
        username: userData.Username,
        password: 'New passowrd',
        email: userData.Email,
        birthday: userData.Birthday.slice(0, 10),
      });
      this.username = userData.Username;
    }
    this.getFavouriteMovies();
  }

  onSubmit(): void {
    const formData = this.profileForm.value;
    const modifiedObject = this.capitalizeFirstLetter(formData);
    this.FetchApiDataService.updateUser(
      this.username,
      JSON.stringify(modifiedObject)
    ).subscribe(() => {
      // Handle success
      this.snackBar.open('Updated succesfully', 'OK', {
            duration: 2000
      });
      // Optionally, update local storage or reload page
    });
  }
  capitalizeFirstLetter(obj: any): any {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        newObj[capitalizedKey] = obj[key];
      }
    }
    return newObj;
  }
  getMovies(): void {
    this.FetchApiDataService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  getFavouriteMovies(): void {
  this.FetchApiDataService.getAllMovies().subscribe((resp: any) => {
    this.movies = resp;

    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const favoriteMovieIds = userData.FavouriteMovies;

      this.favouriteMovies = this.movies.filter((movie) => favoriteMovieIds.includes(movie._id));
    }
  });
}
}
