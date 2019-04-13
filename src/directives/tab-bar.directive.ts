import {Directive} from '@angular/core';

/*
 * This is technically a directive
 * but we have to treat it like a provider to be able to manipulate it directly.
 * So it must be imported into our app.module as a provider, instead of a directive.
 *
 * The reason I'm keeping it as a directive, instead of a service provider, is because it interacts with the DOM
 * and not any data retrial / presentation, even though it's imported as one...weird I know.
 */

// TODO: Rework this for ionic 4 - https://medium.com/@JordanBenge/ionic-4-hiding-showing-tabs-on-certain-pages-31cf2380a5db?source=your_stories_page


@Directive({
  selector: '[tab-bar-directive]' // Attribute selector
})
export class TabBarDirective {

  /*
   * Shows the tabs.
   */
  public show() {
    let tabBarElement:any = document.querySelector('.tabbar.show-tabbar');

    try {
      if(tabBarElement.style.display != 'flex') {
        tabBarElement.style.display = 'flex';
      }
    } catch(err) {}
  }

  /*
   * Hides the tabs.
   */
  public hide() {
    let tabBarElement:any = document.querySelector('.tabbar.show-tabbar');

    try {
      if(tabBarElement.style.display != 'none') {
        tabBarElement.style.display = 'none';
      }
    } catch (err) {}
  }
}
