import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private authSecretKey = 'token';
  private apiUrl = 'https://cezarszlmyflix-0212aa467a8d.herokuapp.com';

  constructor(private http: HttpClient) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  login(username: string, password: string): Observable<boolean> {
  const userDetails = { Username: username, Password: password };
  return this.http.post<any>(`${this.apiUrl}/login`, userDetails)
    .pipe(
      catchError(this.handleError),
      map(response => {
        const authToken = response.token;
        if (authToken) {
          localStorage.setItem(this.authSecretKey, authToken);
          localStorage.setItem("userData", response.user);
          this.isAuthenticated = true;
          return true;
        } else {
          return false;
        }
      })
    );
}

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
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

