import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("A test recipe", "description test",
    "https://www.bbcgoodfood.com/recipes/collection/easy")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
