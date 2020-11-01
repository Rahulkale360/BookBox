import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string = '', length: number =30): any {
    let charcters = value.slice(0,length);
    if(value.length > length){
      charcters += '...';
    }
    return charcters;
  }

}
