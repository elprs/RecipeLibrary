import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';

const routes = [{ path: '', component: AuthComponent }];
@NgModule({
  declarations: [AuthComponent],
  imports: [FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), SharedModule
  ],
})
export class AuthModule {}
