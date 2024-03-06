import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://cezarszlmyflix-0212aa467a8d.herokuapp.com/';

  private authSecretKey = 'Bearer Token';

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem(this.authSecretKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });
  }
  getMovies() : Observable<any> { 
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/movies`, { headers })
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
