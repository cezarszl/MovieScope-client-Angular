import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying genre information in a dialog.
 */
@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {

  /**
   * Constructor for GenreViewComponent.
   * @param dialogRef Reference to the dialog opened by MatDialog.
   * @param data Data passed to the dialog, containing genre information.
   */
  constructor(
    public dialogRef: MatDialogRef<GenreViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { genre: any }
  ) { }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {

  }
}
