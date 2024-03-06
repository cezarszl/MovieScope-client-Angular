import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

/**
 * Authentication service.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private authSecretKey = 'token';
  private user = 'userData';
  private apiUrl = 'https://cezarszlmyflix-0212aa467a8d.herokuapp.com';

  /**
   * Constructor.
   * @param http - HttpClient instance.
   */
  constructor(private http: HttpClient) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  /**
   * Logs in the user.
   * @param username - User's username.
   * @param password - User's password.
   * @returns Observable<boolean>.
   */
  login(username: string, password: string): Observable<boolean> {
    const userDetails = { Username: username, Password: password };
    return this.http.post<any>(`${this.apiUrl}/login`, userDetails)
      .pipe(
        catchError(this.handleError),
        map(response => {
          const authToken = response.token;
          if (authToken) {
            localStorage.setItem(this.authSecretKey, authToken);
            localStorage.setItem(this.user, JSON.stringify(response.user));
            this.isAuthenticated = true;
            return true;
          } else {
            return false;
          }
        })
      );
  }

  /**
   * Checks if user is authenticated.
   * @returns True if user is authenticated, otherwise false.
   */
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Logs out the user.
   */
  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
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
