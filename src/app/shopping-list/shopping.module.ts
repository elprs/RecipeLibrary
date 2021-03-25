
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

const routes =   [ { path: 'shopping-list', component: ShoppingListComponent } ];



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
imports: [
SharedModule,
FormsModule,
RouterModule.forChild(routes)
],

})
export class ShoppingModule {

}
