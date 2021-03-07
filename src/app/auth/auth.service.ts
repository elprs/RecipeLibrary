import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, timeout } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

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
  user = new BehaviorSubject<User>(null); // this means when we fetch data and we need that token at this point of time, even if the user logged
  //in before that point of time which will have been the case, we get access to that latest user.
  token: string = null;
  private tokenExpirationTimer : any;


  constructor(private http: HttpClient, private router: Router) {}

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
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvfEjBFiVlPGSCst5I-G5YvzwBQxzScSg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  autoLogIn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);

      //expiration duration is basically this timestamp here
      //so the token expiration date wrapped into a date in milliseconds which we get by calling get time, minus the current timestamp which we get with new date, in milliseconds with get time.
      const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer)
    {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer =     setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  };

  private handleError(errorRes: HttpErrorResponse) {
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
          break;
      }
      return throwError(errorMessage);
    }
  };

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000); // times 1000 gives us the amount in milliseconds.
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
