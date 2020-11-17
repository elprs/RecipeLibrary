import { RecipeService } from './../recipe.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input()
  recipe: Recipe; // we add this property in order to get the details data to the
                           // recipes component
                           id: number;
  constructor(private recipeService : RecipeService,
    private  route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
   this.route.params.subscribe(
     (params: Params)=>{
       this.id = +params['id'];
       this.recipe = this.recipeService.getRecipe(this.id);
     }
   )

  }

  onAddToShoppingList(){
    this.recipeService.addIgredientsToShoppingList(this.recipe.ingredietns);
  }
  onEditRecipe()
  {
      this.router.navigate(['edit'], {relativeTo: this.route});
      // this.router.navigate(['...', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteREcipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
