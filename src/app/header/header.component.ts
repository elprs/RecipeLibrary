import { Component, EventEmitter, Output } from "@angular/core";



@Component({
  // pass a js object here to configute this decorator
  selector: 'app-header',
  templateUrl: './header.component.html'

})// a component is just a ts class, needs an identifier and a decorator
export class HeaderComponent{
  collapsed = true;
  @Output() featureSelected = new EventEmitter<string>();
  // @output makes it listenable from outside this component

  onSelect(feature: string){
    this.featureSelected.emit(feature);
    // use this property to emit an event whenever we click the buttons
  }

}
