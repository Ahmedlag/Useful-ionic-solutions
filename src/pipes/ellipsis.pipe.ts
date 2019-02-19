import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  // TODO: Create this pipe.
  transform(value: any, args?: any): any {
    return null;
  }

}
