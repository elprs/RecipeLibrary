
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeStartComponent } from './reciped/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import {RecipesResolverService} from './recipes/recipes-resolver.service'
import { AuthComponent } from './auth/auth.component';


const appRoutes: Routes = [
      { path: '', redirectTo: '/recipes', pathMatch: 'full'},
      { path: 'recipes', component: RecipesComponent, children:[
        {path:'', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]},
        {path: ':id/edit', component: RecipeEditComponent,
        resolve: [RecipesResolverService]}
      ] },
      { path: 'shopping-list', component: ShoppingListComponent },
      { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
