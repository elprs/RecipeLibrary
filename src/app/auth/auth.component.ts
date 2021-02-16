import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert('This form is not valid');
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs = new Observable<AuthResponseData>();

    // here is before the request, thus we can put  the loading spinner to start by setting true the isLoading
    this.isLoading = true;
    if (this.isLoginMode) {
      //Log in the user
      authObs = this.authService.logIn(email, password);
    } else {
      //subscribe the user
      authObs = this.authService.signup(email, password, true);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
      },
      (errorMessage) => {
        // an observable with the error message returning from the authService dince we subscribed
        //So we know that we get the error message here as a data point, but more importanly we can assign it to the this.error
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
