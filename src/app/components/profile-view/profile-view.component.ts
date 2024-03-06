import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../../services/movie.service';
import { UserService } from '../../services/user.service';

/**
 * Component for displaying user profile.
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  /**
   * User's username.
   */
  username: any;

  /**
   * Array of all movies.
   */
  movies: any[] = [];

  /**
   * Array of user's favorite movies.
   */
  favouriteMovies: any[] = [];

  /**
   * Form for user profile.
   */
  profileForm = new FormGroup({
    username: new FormControl<string>(''),
    password: new FormControl<string>(''),
    email: new FormControl<string>(''),
    birthday: new FormControl<string>(''),
  });

  /**
   * Constructor.
   * @param UserService - UserService instance.
   * @param formBuilder - FormBuilder instance.
   * @param snackBar - MatSnackBar instance.
   * @param MovieService - MovieService instance.
   */
  constructor(
    private UserService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private MovieService: MovieService
  ) { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    // Initialize form with user data
    this.profileForm = this.formBuilder.group({
      username: [''],
      password: [''],
      email: [''],
      birthday: [''],
    });

    // Fetch user data and populate form
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.profileForm.patchValue({
        username: userData.Username,
        password: 'New passoword',
        email: userData.Email,
        birthday: userData.Birthday.slice(0, 10),
      });
      this.username = userData.Username;
    }
    this.getFavouriteMovies();
  }

  /**
   * Handles form submission.
   */
  onSubmit(): void {
    const formData = this.profileForm.value;
    const modifiedObject = this.capitalizeFirstLetter(formData);
    console.log(modifiedObject)
    this.UserService.updateUserData(
      this.username,
      JSON.stringify(modifiedObject)
    ).subscribe(() => {
      this.snackBar.open('Updated succesfully', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Capitalizes the first letter of each property in an object.
   * @param obj - Object to be modified.
   * @returns Object with capitalized keys.
   */
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

  /**
   * Retrieves user's favorite movies.
   */
  getFavouriteMovies(): void {
    this.MovieService.getMovies().subscribe((resp: any) => {
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
