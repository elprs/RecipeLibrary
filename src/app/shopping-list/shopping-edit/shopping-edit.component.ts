import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm : NgForm;
  subscription : Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem : Ingredient;

  // I could have used the local references inthe html file to pass the values
  // but i will use the @ViewChild approach
  // so the nameInputRef gets a value by using the @ViewChild
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // ingredientAdded = new EventEmitter<{name: string, amount: string}>();
  // it accepts in the <>  a type definition , meaning a JS object. Since we have
  // already the type we use straight the Ingredient model:
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor( private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
      }
    );
  }

  onSubmitItem(form : NgForm){
    const value = form.value;
    // they will be assigned only one time
    // const ingredientName = this.nameInputRef.nativeElement.value;
    // const ingredientAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(value.name, value.amount );

    if(this.editMode)
    {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
    // I emit the new event and pass the newIngredient as data
    // this.ingredientAdded.emit(newIngredient); I dont need to do that because
  }
    onClear(){
      this.slForm.reset();
      this.editMode = false;
    }

    onDelete(){
      this.slService.deleteIngredient(this.editedItemIndex);
      this.onClear()

    }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this.subscription.unsubscribe();

  }
}
