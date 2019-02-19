import {Directive, Input, OnInit} from '@angular/core';
@Directive({
  selector: '[img-preloader]', // E.g <img img-preloader="http://some_remote_image_url"
  host: {
    '[attr.src]': 'finalImage'    // the attribute of the host element we want to update. in this case, <img 'src' />
  }
})

// Class must implement OnInit for @Input()
export class ImagePreloaderDirective implements OnInit {
  @Input('img-preloader') targetSource: string;

  downloadingImage: any; // In class holder of remote image
  finalImage: any; // property bound to our host attribute.

  // Whatever the default image is supposed to be..
  @Input() defaultImage = 'assets/preloader.gif';

  // ngOnInit is needed to access the @inputs() variables. these aren't available on constructor()
  ngOnInit() {
    // First set the final image to some default image while we prepare our preloader:
    this.finalImage = this.defaultImage;

    this.downloadingImage = new Image();  // create image object
    this.downloadingImage.onload = () => { // Once image is completed, console.log confirmation and switch our host attribute
      console.log('image downloaded');
      this.finalImage = this.targetSource;  // do the switch 😀
    };
    // Assign the src to that of some_remote_image_url. Since its an Image Object the
    // on assignment from this.targetSource download would start immediately in the background
    // and trigger the onload()
    this.downloadingImage.src = this.targetSource;
  }
}
