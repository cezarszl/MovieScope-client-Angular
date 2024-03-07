import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../../services/movie.service';
import { UserService } from '../../services/user.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component for displaying details of a single movie.
 */
@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss'],
})
export class MovieViewComponent implements OnInit {

  /**
   * Array of all movies.
   */
  movies: any[] = [];

  /**
   * Currently selected movie.
   */
  movie: any;

  /**
   * Array of similar movies.
   */
  similarMovies: any[] = [];

  /**
   * Flag indicating whether the movie is in favorites.
   */
  isFavourite = false;

  /**
   * Constructor.
   * @param route - ActivatedRoute instance.
   * @param snackBar - MatSnackBar instance.
   * @param movieService - MovieService instance.
   * @param userService - UserService instance.
   * @param dialog - MatDialog instance.
   */
  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private movieService: MovieService,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    this.getMovie();
  }

  /**
   * Retrieves the selected movie.
   */
  getMovie(): void {
    this.movieService.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this.movie = this.movies.find((movie) => movie._id === id);
        this.getSimilarMovies();
        const movieId = this.movie._id;
        this.isFavourite = this.checkIfFavourite(movieId);
      });
    });
  }

  /**
   * Retrieves similar movies.
   */
  getSimilarMovies(): void {
    const selectedMovie = this.movie;
    this.similarMovies = this.movies.filter((m) => {
      return (
        m._id !== selectedMovie._id && m.Genre.Name === selectedMovie.Genre.Name
      );
    });
  }

  /**
   * Toggles the favorite status of the movie.
   */
  toggleFavourite(): void {
    let username: string | null = null;
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      username = userData.Username;
    }
    if (!username) {
      return;
    }
    if (this.isFavourite) {
      this.userService
        .deleteFavouriteMovie(username, this.movie._id)
        .subscribe(() => {
          this.isFavourite = false;
          this.snackBar.open('Removed from favorites', 'OK', {
            duration: 2000,
          });
        });
    } else {
      this.userService
        .addFavouriteMovie(username, this.movie._id)
        .subscribe(() => {
          this.isFavourite = true;
          this.snackBar.open('Added to favorites', 'OK', {
            duration: 2000,
          });
        });
    }
  }

  /**
   * Checks if the movie is in favorites.
   * @param movieId - ID of the movie.
   * @returns Whether the movie is in favorites.
   */
  checkIfFavourite(movieId: string): boolean {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      return false;
    }
    const userData = JSON.parse(userDataString);
    const favouriteMovies = userData.FavouriteMovies || [];
    return favouriteMovies.includes(movieId);
  }

  /**
   * Opens a dialog displaying genre details.
   */
  openGenreDetailsDialog(): void {
    this.dialog.open(GenreViewComponent, { width: '400px', data: { genre: this.movie.Genre } });
  }

  /**
   * Opens a dialog displaying director details.
   */
  openDirectorDetailsDialog(): void {
    this.dialog.open(DirectorViewComponent, { width: '400px', data: { director: this.movie.Director } });
  }
}
