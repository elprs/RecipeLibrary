import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
let authObs = new Observable<AuthResponseData>();

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  token: string = null;



  constructor(private http: HttpClient) {}



  signup(email: string, password: string, returnSecureToken: boolean) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvfEjBFiVlPGSCst5I-G5YvzwBQxzScSg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
            );
        })
      )

  };

  logIn(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvfEjBFiVlPGSCst5I-G5YvzwBQxzScSg',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError)
    );

  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred.'; // initiate it in case we cannot identify any error
    if (!errorRes.error || !errorRes.error.error) {
      // the switch will fail in the case that we have errow with different format, eg a network error.  thus we check with the if
      //we throw an observable that in the end wraps that message
      return throwError(errorMessage);
    } else {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists.';
          break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist';
            break;
            case 'INVALID_PASSWORD':
            errorMessage = 'This password is invalid';
            break
      }
      return throwError(errorMessage);
    }
  };

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number)
    {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
  }


}
