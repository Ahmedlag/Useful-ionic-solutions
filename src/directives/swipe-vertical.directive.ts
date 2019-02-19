import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {Gesture} from 'ionic-angular/gestures/gesture'
declare var Hammer: any;

/*
 Class for the SwipeVertical directive (attribute (swipe) is only horizontal).

 In order to use it you must add swipe-vertical attribute to the component.
 The directives for binding functions are [swipeUp] and [swipeDown].

 IMPORTANT:
 [swipeUp] and [swipeDown] MUST be added in a component which
 already has "swipe-vertical".

 You may also have to import hammerjs into your main.ts file, but I'm not sure if that is actually required...
 import 'hammerjs';
 */

@Directive({
  selector: '[swipe-vertical]' // Attribute selector
})
export class SwipeVertical implements OnInit, OnDestroy {
  @Input('swipeUp') actionUp: any;
  @Input('swipeDown') actionDown: any;

  private el: HTMLElement;
  private swipeGesture: Gesture;
  private swipeDownGesture: Gesture;

  constructor(el: ElementRef) {
    this.el = el.nativeElement
  }

  ngOnInit() {
    this.swipeGesture = new Gesture(this.el, {
      recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_VERTICAL}]
      ]
    });
    this.swipeGesture.listen();
    this.swipeGesture.on('swipeup', e => {
      this.actionUp()
    });
    this.swipeGesture.on('swipedown', e => {
      this.actionDown()
    });
  }

  ngOnDestroy() {
    this.swipeGesture.destroy()
  }
}
