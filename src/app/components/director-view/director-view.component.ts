import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying director information in a dialog.
 */
@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  /**
   * Constructor for DirectorViewComponent.
   * @param dialogRef Reference to the dialog opened by MatDialog.
   * @param data Data passed to the dialog, containing director information.
   */
  constructor(
    public dialogRef: MatDialogRef<DirectorViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { director: any }
  ) { }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {

  }
}
