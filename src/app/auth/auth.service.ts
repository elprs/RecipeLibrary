import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";



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

    );

  }
}
