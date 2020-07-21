import { EventEmitter, Output } from '@angular/core';
import { Recipe } from './../../recipe.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

 @Input() recipe: Recipe;
 // the issue was that we didnt have the recipe-item component
 // anymore. so we added the recipe which is the recipe of that
 // single item-component
 // The Recipe type needs to be imported in order to be used
 // It is not assigned to a value initially because we are to get
 // the value from outside. So it slaso has the @Input() decorator
 // because we want to bind this component property from outside
 // in particular from our list-component. so lets' go to the
 // recipe-list.component.html to add the binding [recipe]...abs
 

 @Output() recipeSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(){
this.recipeSelected.emit();
  }
}
