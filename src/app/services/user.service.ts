import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'https://cezarszlmyflix-0212aa467a8d.herokuapp.com';

  private authSecretKey = 'token';

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem(this.authSecretKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
  }

  getFavouriteMovies(username: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .get<any>(`${this.apiUrl}/users/${username}`, { headers })
      .pipe(map(this.extractResponseData), map((data) => data.FavoriteMovies), catchError(this.handleError));
  }

  addFavouriteMovie(username: string, movieId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .post<any>(`${this.apiUrl}/users/${username}/movies/${movieId}`, null, { headers })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError),
         tap(updatedUserData => {
         const userData = JSON.parse(localStorage.getItem("userData") || '{}');
          console.log(localStorage.getItem("userData"));
          if (userData) {
            userData.FavouriteMovies = updatedUserData.FavouriteMovies;
            localStorage.setItem("userData", JSON.stringify(userData));
            console.log(localStorage.getItem("userData"));
          }
        })
      );
  }

  deleteFavouriteMovie(username: string, movieId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .delete<any>(`${this.apiUrl}/users/${username}/movies/${movieId}`, { headers })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError),
        tap(updatedUserData => {
          const userData = JSON.parse(localStorage.getItem("userData") || '{}');
          if (userData) {
            userData.FavouriteMovies = updatedUserData.FavouriteMovies;
            localStorage.setItem("userData", JSON.stringify(userData));
          }
        })
      );
  }

  updateUserData(username: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put<any>(`${this.apiUrl}/users/${username}`, data, { headers })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

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
