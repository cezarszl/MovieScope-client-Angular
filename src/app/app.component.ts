import { Component } from '@angular/core';

/**
 * Root component of the Angular application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Title of the application.
   */
  title = 'myFlix-Angular-client';

  /**
   * Creates an instance of AppComponent.
   */
  constructor() { }
}
