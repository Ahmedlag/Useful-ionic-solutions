import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

/*
 * Do something when a user double or triple taps an element
 * Example: <div doubleTripleTap (doubleTap)="doSomething()" (tripleTap)="doSometingElse()"></div>
 */

@Directive({
  selector: '[doubleTripleTap]'
})
export class DoubleTripleTapDirective {

  @Output() doubleTap = new EventEmitter();
  @Output() tripleTap = new EventEmitter();

  constructor() { }

  @HostListener('tap',  ['$event'])
  onTap(e) {
    if (e.tapCount === 2) {
      this.doubleTap.emit(e)
    }

    if (e.tapCount === 3) {
      this.tripleTap.emit(e)
    }
  }

}
