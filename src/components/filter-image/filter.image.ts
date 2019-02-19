import { Component, Input }                           from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'filter-image-component',
  templateUrl: 'filter-image-component.html',
})
export class FilterImageComponent {

  @Input() selectedMedia: any;

  /*
   * A list of the most popular photo filters, ordered by popularity / contrast to neighbors.
   */
  filters = [
    {name: 'Apply Filter', class: 'normal', filter: ''},
    {name: 'Clarendon', class: 'clarendon', filter: 'contrast(1.20) brightness(1.0) saturate(1.25)'},
    {name: 'Gingham', class: 'gingham', filter: 'brightness(1.05) hue-rotate(350deg)'},
    {name: 'Valencia', class: 'valencia', filter: 'contrast(1.08) brightness(1.08) sepia(0.08)'},
    {name: 'Lark', class: 'lark', filter: 'contrast(0.9)'},
    {name: 'Mayfair', class: 'mayfair', filter: 'contrast(1.1) saturate(1.1)'},
    {name: 'Aden', class: 'aden', filter: 'contrast(0.9) brightness(1.2) saturate(0.85) hue-rotate(20deg)'},
    {name: 'Brannan', class: 'brannan', filter: 'sepia(0.5) contrast(1.4)'},
    {name: 'Brooklyn', class: 'brooklyn', filter: 'contrast(0.9) brightness(1.1)'},
    {name: 'Earlybird', class: 'earlybird', filter: 'contrast(0.9) sepia(0.2)'},
    {name: 'Hudson', class: 'hudson', filter: 'brightness(1.2) contrast(0.9) saturate(1.1)'},
    {name: 'Lofi', class: 'lofi', filter: 'saturate(1.1) contrast(1.5)'},
    {name: '1977', class: '1977', filter: 'contrast(1.1) brightness(1.1) saturate(1.3) '},
    {name: 'Amaro', class: 'amaro', filter: ' contrast(1.4) brightness(1.1) saturate(1.5)  '},
    {name: 'Moon', class: 'moon', filter: 'grayscale(1) contrast(1.1) brightness(1.1)'},
  ];
  filter = this.filters[0];

  title: string;

  constructor(public navCtrl: NavController) {
  }

  /*
   * Filter Functions
   */

  async swipeFilter(direction, media) {
    let nextIndex:any = await this.getFilterIndex(media.filter) + 1;
    let prevIndex:any = await this.getFilterIndex(media.filter) - 1;

    if(direction == 2 && nextIndex < this.filters.length) { // right swipe
      this.changeFilter(this.filters[nextIndex], media);
    }
    else if (direction == 4 && prevIndex >= 0) { // left swipe
      this.changeFilter(this.filters[prevIndex], media);
    }
  }

  // returns the filter index for that particular media image.
  getFilterIndex(filter) {
    return this.filters.map(function(e) {
      return e.name;
    }).indexOf(filter.name);
  }

  private async changeFilter(newFilter:any, photo) { // Changes the filter
    this.filter = newFilter;
    this.title = this.filter.name;
    this.applyFilter(newFilter.filter);
  }

  private async applyFilter(filter: string) { // apply's the filter
    let image = await this.findImage();
    let thumbnailImage = await this.findThumbnailImage();
    image.style.filter = filter;
    thumbnailImage.style.filter = filter;
  }

  private findThumbnailImage(): HTMLImageElement {
    return (<HTMLImageElement>document.getElementById('previewMedia-' + this.selectedMedia.id));
  }

  private findImage(): HTMLImageElement { // Finds the image with the id 'imageFilter'
    return (<HTMLImageElement>document.getElementById('media-' + this.selectedMedia.id));
  };

}
