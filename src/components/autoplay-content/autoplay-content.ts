import {Component, ContentChildren, ElementRef, NgZone, OnDestroy, OnInit, QueryList} from '@angular/core';
import {AutoplayVideoDirective}                                                       from '../../directives/autoplay-video.directive';

@Component({
  selector: 'autoplay-content',
  template: `<ng-content></ng-content>`
})

/*
 * Wrap this around any content that you want to be autoplayed / paused.
 * Ideally within a component of a page. Unknown side effects of wraping it on a page.
 * Referenced from https://www.ionicrun.com/autoplay-videos-when-visible-in-view-with-ionic-2/
 */

export class AutoplayContentComponent implements OnInit, OnDestroy {

  @ContentChildren(
    AutoplayVideoDirective,
    {
      read: ElementRef,
      descendants: true
    }
  ) autoPlayVideoRefs: QueryList<AutoplayVideoDirective>;

  private intersectionObserver: IntersectionObserver;
  private mutationObserver: MutationObserver;

  private play: Promise<any>;

  constructor(private element: ElementRef,
              public ngZone: NgZone) {}


  public ngOnInit() {
    // we can run this outside the ngZone, no need to trigger change detection
    this.ngZone.runOutsideAngular(() => {
      this.intersectionObserver = this.getIntersectionObserver();
      this.mutationObserver = this.getMutationObserver(this.element.nativeElement);
    });
  }

  // clean things ups
  public ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  // construct the InterSectionObserver and return it
  private getIntersectionObserver() {
    // execute the onIntersection on the threshold intersection of 0 and 70%
    return new IntersectionObserver(entries => this.onIntersection(entries), {
      threshold: [0, 0.70]
    });
  }


  // construct the MutationObserver and return it
  private getMutationObserver(containerElement: HTMLElement) {
    // execute the onDomChange
    let mutationObserver = new MutationObserver(() => this.onDomChange());

    // at the very least, childList, attributes, or characterData
    // must be set to true
    const config = { attributes: true, characterData: true, childList: true };

    // attach the mutation observer to the container element
    // and start observing it
    mutationObserver.observe(containerElement, config);

    return mutationObserver;

  }


  private onDomChange() {
    // when the DOM changes, loop over each element
    // we want to observe for its interection,
    // and do observe it
    this.autoPlayVideoRefs.forEach((video: ElementRef) => {
      this.checkIfVideosCanLoad(video.nativeElement);

      this.intersectionObserver.observe(video.nativeElement);
    });
  }

  /*
   * In low-power mode, videos do not load.
   * So this quickly checks to see if videos have the capability of loading.
   */
  private async checkIfVideosCanLoad(video:any) {
    let canPlay: boolean;

    return new Promise((resolve) => {
      // A safe timeout of 3 seconds, before we declare that the phone is in low power mode.
      let timeout = setTimeout(() => {
        canPlay = false;
        resolve(canPlay);
      }, 3000);

      // Loads meta data about the video, but not the whole video itself.
      video.onloadeddata = () => {
        canPlay = true;
        clearTimeout(timeout);
        resolve(canPlay);
      };
    });
  }


  private onIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry: any) => {

      // get the video element
      let video = entry.target;
      // this.checkIfVideosCanLoad(video).then(val => {
      //   console.log('Can play: ', val);
      // });

      // are we intersecting?
      if (!entry.isIntersecting) { return; }


      // play the video if we passed the threshold
      // of 0.7 and store the promise so we can safely
      // pause it again
      if (entry.intersectionRatio >= 0.70) {
        if (this.play === undefined) { this.play = video.play(); }

      } else if (entry.intersectionRatio < 0.70) {

        // no need to pause something if it didn't start playing yet.
        if (this.play !== undefined) {

          // wait for the promise to resolve, then pause the video
          this.play.then(_ => {
            video.pause();
            this.play = undefined;
          }).catch(() => {});
        }
      }
    });
  }
}
