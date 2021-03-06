import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { EventEmitter, OnDestroy, Output } from '@angular/core';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit , OnDestroy{
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [ ];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) {} // we need to inject the service


  ngOnInit(): void {
   this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
      this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
      }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route   } );
  }

//   onRecipeSelected(recipe: Recipe) {
//     this.recipeWasSelected.emit(recipe);
//   }
 }
