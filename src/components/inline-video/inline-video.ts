import {Input, Component} from '@angular/core';

@Component({
  selector: 'inline-video',
  template: 'inline-video.html',
})

/*
 * This allows you to include inline videos (that have the capability to auto play/pause)
 * But requires that you include the following in your config.xml:
 * <preference name="AllowInlineMediaPlayback" value="true" />
 */

export class InlineVideoComponent {

  /*
   * Media must have a unique ID associated with it, or else it pauses / plays all media
   * So we pass the id to the autoplay directive / the changeVideoAudio function as well.
   */
  @Input() media: any;

  public changeVideoAudio(id) {
    let vid:any = document.getElementById('media-' + id);
    vid.muted = !vid.muted;
  }
}
