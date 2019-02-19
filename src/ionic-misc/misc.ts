
/*
 * Allows you to extend & customize the native hammerjs configuration.
 * You have to put all of this into your app.module.ts file.
 * provides: [
 *   { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
 * ]
 */

import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    'press': { time: 400 },  //set press delay for 1 second
    'pinch': { enable: false },
    'rotate': { enable: false },
    /*
     * This last bit isn't necessary if you're using the swipe-vertical directive.
     *
    'swipe': {
      velocity: 0.4,
      threshold: 20,
      direction: 31 // /!\ ugly hack to allow swipe in all direction
    }
    */
  }
}
