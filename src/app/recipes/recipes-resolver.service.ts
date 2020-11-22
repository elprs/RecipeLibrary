import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { resolve } from 'dns';
import { Observable } from 'rxjs';


@Injectable
({providedIn: 'root'})
export
class RecipesResolverService implements Resolve<Recipe[]>{
  constructor(private dataStorageService : DataStorageService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   return this.dataStorageService.fetchRecipes();
  }
}





