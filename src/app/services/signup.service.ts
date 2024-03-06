import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = 'https://cezarszlmyflix-0212aa467a8d.herokuapp.com';

  constructor(private http: HttpClient) { }

  signup(username: string, password: string, email: string, birthday: string): Observable<any> {
    const userDetails = { Username: username, Password: password, Email: email, Birthday: birthday };
    console.log(userDetails);
    return this.http.post<any>(`${this.apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
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


