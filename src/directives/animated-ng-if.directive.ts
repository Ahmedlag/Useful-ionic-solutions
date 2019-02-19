import {NgIf} from '@angular/common';
import {
  Directive,
  EmbeddedViewRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

/**
 * The "animationend" event won't be fired if the element doesn't have animation applied to it.
 * This utility function uses a timeout as a fallback to ensure the callback is fired.
 *
 * This requires you to create your own animation CSS, but also means that you don't need to touch this directive
 * if you want to change animations between two different elements.
 */
function animationEndSafe(el: Element, maxWait: number): Promise {
  return new Promise((resolve, reject) => {
    el.addEventListener('animationend', resolve);
    setTimeout(resolve, maxWait);
  });
}

@Directive({
  selector: '[appAnimatedIf]',
})
export class AnimatedIfDirective extends NgIf {
  private visible = false;

  @Input()
  set appAnimatedIf(val: boolean) {
    if (this.visible && !val) {
      this.hide();
    } else if (!this.visible && val) {
      this.show();
    }
    this.visible = val;
  }

  @Output() animatedIfOnShow = new EventEmitter<any>(false);
  @Output() animatedIfOnHide = new EventEmitter<any>(false);

  constructor(private viewContainer: ViewContainerRef, _templateRef: TemplateRef<any>) {
    super(viewContainer, _templateRef);

    // any extra initialization goes here...
  }

  private getContainer(): HTMLElement|null {
    if (this.viewContainer.length > 0) {
      return (this.viewContainer.get(0) as EmbeddedViewRef<any>).rootNodes[0];
    } else {
      return null;
    }
  }

  /**
   * Hides the element. Animation is performed through css on the container.
   * This method will set the class to hiding and preserve the element for the animation duration.
   */
  private hide() {
    let container = this.getContainer();
    if (!!container) {
      container.classList.remove('showing');
      container.classList.add('hiding');

      animationEndSafe(container, 1000).then(() => {
        this.ngIf = this.visible;
        container.classList.remove('hiding');
      });

      this.animatedIfOnHide.emit();
    }
  }

  /**
   * Shows the element. Animation is performed through css on the container
   */
  private show() {
    this.ngIf = true;

    let container = this.getContainer();
    if (!!container) {
      container.classList.remove('hiding');
      container.classList.add('showing');


      animationEndSafe(container, 1000).then(() => {
        container.classList.remove('showing');
      });

      this.animatedIfOnShow.emit();
    }
  }
}
