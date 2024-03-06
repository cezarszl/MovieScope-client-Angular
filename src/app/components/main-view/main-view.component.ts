import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {
  movies: any[] = [];
  constructor(public MovieService: MovieService) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.MovieService.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
}