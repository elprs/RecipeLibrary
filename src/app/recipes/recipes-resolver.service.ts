import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
// import { resolve } from 'dns';
import { Observable } from 'rxjs';


@Injectable
({providedIn: 'root'})
export
class RecipesResolverService implements Resolve<Recipe[]>{
  constructor(private dataStorageService : DataStorageService, private RecipeService : RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.RecipeService.getRecipes();

    if (recipes.length === 0 ){
      return this.dataStorageService.fetchRecipes();
    }
    else
    {
      return recipes;
    }


  }
}





