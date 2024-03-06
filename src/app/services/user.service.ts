import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';

/**
 * Service for user-related operations.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://cezarszlmyflix-0212aa467a8d.herokuapp.com';

  private authSecretKey = 'token';

  /**
   * Retrieves the HTTP headers including the authorization token.
   * @returns HttpHeaders instance.
   */
  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem(this.authSecretKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
  }

  /**
   * Retrieves the user's favorite movies.
   * @param username - The username of the user.
   * @returns Observable<any> representing the user's favorite movies.
   */
  getFavouriteMovies(username: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/users/${username}`, { headers })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * Adds a movie to the user's favorite list.
   * @param username - The username of the user.
   * @param movieId - The ID of the movie to be added to favorites.
   * @returns Observable<any> representing the response after adding the movie.
   */
  addFavouriteMovie(username: string, movieId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/users/${username}/movies/${movieId}`, null, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError),
        tap(updatedUserData => {
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          if (userData) {
            userData.FavouriteMovies = updatedUserData.FavouriteMovies;
            localStorage.setItem('userData', JSON.stringify(userData));
          }
        })
      );
  }

  /**
   * Deletes a movie from the user's favorite list.
   * @param username - The username of the user.
   * @param movieId - The ID of the movie to be deleted from favorites.
   * @returns Observable<any> representing the response after deleting the movie.
   */
  deleteFavouriteMovie(username: string, movieId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/users/${username}/movies/${movieId}`, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError),
        tap(updatedUserData => {
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          if (userData) {
            userData.FavouriteMovies = updatedUserData.FavouriteMovies;
            localStorage.setItem('userData', JSON.stringify(userData));
          }
        })
      );
  }

  /**
   * Updates user data.
   * @param username - The username of the user.
   * @param data - The data to be updated.
   * @returns Observable<any> representing the response after updating the user data.
   */
  updateUserData(username: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/users/${username}`, data, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Extracts the response data from HTTP response.
   * @param res - HTTP response.
   * @returns Extracted response data.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
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
