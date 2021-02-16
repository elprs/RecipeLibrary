import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import{throwError} from 'rxjs';




interface AuthResponseData{
 kind: string;
 idToken: string;
 email: string;
 refreshToken: string;
 expiresIn: string;
 localId: string;

}


@Injectable({providedIn: 'root'})
export class AuthService
{
  constructor(
    private http: HttpClient){

  }

  signup(email: string, password: string, returnSecureToken: boolean){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvfEjBFiVlPGSCst5I-G5YvzwBQxzScSg',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }

    ).pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error occurred.'; // initiate it in case we cannot identify any error
      if(!errorRes.error || !errorRes.error.error){ // the switch will fail in the case that we have errow with different format, eg a network error.  thus we check with the if
        //we throw an observable that in the end wraps that message
        return throwError(errorMessage);
      }
      else{
        switch(errorRes.error.error.message){
          case 'EMAIL_EXISTS':
            errorMessage= 'This email exists.';

        }
        return throwError(errorMessage);
      }


    }));

  }
}
