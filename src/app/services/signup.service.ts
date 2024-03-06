import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

/**
 * Service for signup-related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = 'https://cezarszlmyflix-0212aa467a8d.herokuapp.com';

  constructor(private http: HttpClient) { }

  /**
   * Sends signup request to the server.
   * @param username - The username for signup.
   * @param password - The password for signup.
   * @param email - The email for signup.
   * @param birthday - The birthday for signup.
   * @returns Observable<any> representing the signup response.
   */
  signup(username: string, password: string, email: string, birthday: string): Observable<any> {
    const userDetails = { Username: username, Password: password, Email: email, Birthday: birthday };
    return this.http.post<any>(`${this.apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles HTTP error.
   * @param error - HttpErrorResponse instance.
   * @returns Error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    throw new Error('Something bad happened; please try again later.');
  }
}
