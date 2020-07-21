import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecipeLibrary';
  loadedFeature = 'recipe'; // we need to store it with the name we have in html

  onNavigate(feature: string){
    this.loadedFeature = feature; // I could emit this method
  }
}
