import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

/**
 * Component for displaying the main view, including a list of movies.
 */
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  /**
   * Array to store the list of movies.
   */
  movies: any[] = [];

  /**
   * Constructs a new MainViewComponent instance.
   * @param movieService The MovieService instance for fetching movies.
   */
  constructor(public movieService: MovieService) { }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches the list of movies from the MovieService.
   * Updates the 'movies' array with the fetched data.
   */
  getMovies(): void {
    this.movieService.getMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }
}
