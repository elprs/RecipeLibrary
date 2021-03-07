import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogIn();
  }
  title = 'RecipeLibrary';
  // loadedFeature = 'recipe'; // we need to store it with the name we have in html

  // onNavigate(feature: string){
  //   this.loadedFeature = feature; // I could emit this method
  // }
}
