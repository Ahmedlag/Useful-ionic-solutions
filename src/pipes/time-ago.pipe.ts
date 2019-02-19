import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  // TODO: Create this pipe.
  transform(value: any, args?: any): any {
    return null;
  }

}
