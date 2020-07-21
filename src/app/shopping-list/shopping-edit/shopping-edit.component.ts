import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // I could have used the local references inthe html file to pass the values
  // but i will use the @ViewChild approach
  // so the nameInputRef gets a value by using the @ViewChild
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  // ingredientAdded = new EventEmitter<{name: string, amount: string}>();
  // it accepts in the <>  a type definition , meaning a JS object. Since we have
  // already the type we use straight the Ingredient model:
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){
    // they will be assigned only one time
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount );
    // I emit the new event and pass the newIngredient as data
    this.ingredientAdded.emit(newIngredient);
  }
}
