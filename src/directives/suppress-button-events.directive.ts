import {  Directive, ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

/*
 * This suppresses native button events, such as the keyboard closing & losing focus when clicking a submit button.
 * You would use the (onClick) event instead of (tap) or (click).
 */

@Directive({
  selector: '[suppressEvents]',
  inputs: ["suppressEvents"],
  outputs: ["onClick"]
})
export class SuppressButtonEvents implements OnChanges {

  suppressEvents: string | string[];

  onClick: any = new EventEmitter();

  constructor(public element: ElementRef) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.suppressEvents && changes.suppressEvents.firstChange) {
      let el = this.element.nativeElement;

      if (this.suppressEvents == "all" || this.suppressEvents == null) {
        this.suppressEvents = ["click", "mousedown", "touchdown", "touchmove", "touchstart"];

      } else if (typeof this.suppressEvents == "string") {
        this.suppressEvents = [this.suppressEvents];
      } else if (typeof this.suppressEvents == "object" && !Array.isArray(this.suppressEvents)) {
        let r: string[] = [];
        for (let e of this.suppressEvents) {
          r.push(e);
        }
        this.suppressEvents = r;
      }
      for (let evName of this.suppressEvents) {
        el.addEventListener(evName, (event) => {
          this.stopBubble(event);
        });
      }

      el.addEventListener('touchend', (event) => { //Triggered by a phone
        this.stopBubble(event);
        this.onClick.emit(event);
      });
      el.addEventListener('mouseup', (event) => { //Triggered by the browser
        this.onClick.emit(event);
      });
    }
  }

  private stopBubble(event) {
    event.preventDefault();
    event.stopPropagation(); //Stops event bubbling
  }
}
