import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../../fetch-api-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrl: './movie-view.component.scss',
})
export class MovieViewComponent implements OnInit {
  movies: any[] = [];
  movie: any;
  similarMovies: any[] = [];
  isFavourite = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovie(); 
  }

  getMovie(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
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
  getSimilarMovies(): void {
    const selectedMovie = this.movie;
    this.similarMovies = this.movies.filter((m) => {
      return (
        m._id !== selectedMovie._id && m.Genre.Name === selectedMovie.Genre.Name
      );
    });
  }
  toggleFavourite() {
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
      // If the movie is already a favorite, remove it from the list of favorite movies
      this.fetchApiData
        .deleteFavouriteMovie(username, this.movie._id)
        .subscribe(() => {
          this.isFavourite = false;
          this.snackBar.open('Removed from favorites', 'OK', {
            duration: 2000,
          });
        });
    } else {
      // If the movie is not a favorite, add it to the list of favorite movies
      this.fetchApiData
        .addFavouriteMovie(username, this.movie._id)
        .subscribe(() => {
          this.isFavourite = true;
          this.snackBar.open('Added to favorites', 'OK', {
            duration: 2000,
          });
        });
    }
  }
  checkIfFavourite(movieId: string): boolean {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      return false;
    }
    const userData = JSON.parse(userDataString);
    const favouriteMovies = userData.FavouriteMovies || []; // If FavouriteMovies is not present, default to an empty array
    return favouriteMovies.includes(movieId);
  }
}
