import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { normalizeURL } from 'ionic-angular';

@Pipe({
  name: 'normalize',
})
export class NormalizePipe implements PipeTransform {

  constructor(private sanitize: DomSanitizer) {}

  transform(value: string, asUrl?: boolean): string|SafeStyle {
    let result = normalizeURL(value);
    if (asUrl) {
      result = 'url(\'' + result + '\')';
      return this.sanitize.bypassSecurityTrustStyle(result);
    }

    //else
    return result;
  }


}
