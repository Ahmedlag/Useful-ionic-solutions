import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalize'
})
export class NormalizePipe implements PipeTransform {

  // TODO: Create this pipe.
  transform(value: any, args?: any): any {
    return null;
  }

}
