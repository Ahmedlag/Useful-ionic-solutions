import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'grid'
})
export class GridPipe implements PipeTransform {

  transform(array: any[], ...args): any {
    const perRow = args[0];
    return _.chunk(array, perRow);
  }
}
