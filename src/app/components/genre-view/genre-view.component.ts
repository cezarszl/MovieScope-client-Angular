import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { MovieService } from '../../services/movie.service'

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrl: './genre-view.component.scss'
})
export class GenreViewComponent implements OnInit {

  ngOnInit(): void {
  }

}
