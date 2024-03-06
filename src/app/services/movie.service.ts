import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

/**
 * Injectable service for managing movie data.
 */
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  /**
   * Constructs a new MovieService instance.
   * @param http The HttpClient instance to make HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * The base URL of the API.
   */
  private apiUrl = 'https://cezarszlmyflix-0212aa467a8d.herokuapp.com';

  /**
   * The authentication secret key.
   */
  private authSecretKey = 'token';

  /**
   * Gets the HTTP headers for requests.
   * @returns The HttpHeaders object containing the necessary headers.
   */
  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem(this.authSecretKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });
  }

  /**
   * Retrieves a list of movies from the API.
   * @returns An Observable that emits the movie data.
   */
  getMovies(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/movies`, { headers })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Extracts data from the HTTP response.
   * @param res The HTTP response object.
   * @returns The extracted data.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles errors that occur during HTTP requests.
   * @param error The HttpErrorResponse object representing the error.
   * @returns An error message.
   * @throws An error indicating that something bad happened.
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
