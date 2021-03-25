import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  private subscription : Subscription;

  constructor(private shoppingListService : ShoppingListService,
    private loggingSrv :LoggingService) {}

  ngOnInit(): void { // here I will have all my initialiasations & heavy lifting
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged
      .subscribe(
       (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
      }
    );
    this.loggingSrv.printLog('hello form shoppingListComponent ngOnInit')
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

// onEditItem(index : number){
//   this.shoppingListService.startedEditing.next(index);
// }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  // } we dont need this, we will do this in the service
}
