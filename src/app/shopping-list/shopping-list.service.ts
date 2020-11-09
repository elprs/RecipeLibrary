import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';

export class ShoppingListService{
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  startedEditing = new Subject<number>();
  private  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients(){
    return this.ingredients.slice(); // With the slice method I add only a copy pg the ingredients, so I can not access the original service
  }

  getIngredient(index : number){
    return this.ingredients[index];
  }

  addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients : Ingredient[]){
    // for(let ingredient of ingredients){
    //   this.addIngredient()

    this.ingredients.push(...ingredients); // ... => spred operator : makes an array to list of single ingredients
    this.ingredientsChanged.emit(this.ingredients.slice()); // pass a cory
    }
  }


