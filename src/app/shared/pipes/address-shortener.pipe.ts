import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressShortener'
})
export class AddressShortenerPipe implements PipeTransform {

  transform(value: any): any {
    if (value.length) {
      let substrings = value.split(","); 
      let shortenedaddress = substrings[0] + ', ' + substrings[1]; 
      return shortenedaddress; 
    } else {
      return value;
    }
  }
}
