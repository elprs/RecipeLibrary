import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef} from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})


export class DropdownDirective {

  // The dropdown will toggle with a click
  // opens when click on its button, cloases with a click anywhere
 @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event){
    this.isOpen = !this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef){}
}
