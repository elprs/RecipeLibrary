import { RecipeService } from './recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
selectedRecipe: Recipe; // we do that bacause we want to store it as a property
                        // initislly id empty because we assign no value here
                        // but we assign a value when the event listener is placed
  // constructor(private recipeService : RecipeService) { }
  constructor(){}

  ngOnInit(): void {
  //   this.recipeService.recipeSelected
  //       .subscribe(
  //         (recipe : Recipe) => {
  //           this.selectedRecipe = recipe;

  //         }
  //       );
  // }

}
}
