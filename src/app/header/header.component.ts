import { DataStorageService } from './../shared/data-storage.service';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  // pass a js object here to configute this decorator
  selector: 'app-header',
  templateUrl: './header.component.html',
}) // a component is just a ts class, needs an identifier and a decorator
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub: Subscription;
  isAuthenticated = false;
  // @Output() featureSelected = new EventEmitter<string>();
  // @output makes it listenable from outside this component
  // from the paretnt component

  // onSelect(feature: string){
  //   this.featureSelected.emit(feature);
  //   // use this property to emit an event whenever we click the buttons
  // }
  constructor(
    private dataStarageService: DataStorageService,
    private authSrvice: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authSrvice.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
      console.log (!user); 
      console.log (!!user);
    });
  }

  onSaveData() {
    this.dataStarageService.storeRecipes();
  }
  onFetchRecipes() {
    this.dataStarageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
