import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customerEmailFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.title.toLocaleLowerCase().includes(args)) ||
                  (val.discount.toString().toLocaleLowerCase().includes(args)) ||
                  (val.hotelier_profile.name.toLocaleLowerCase().includes(args)) ||
                  (val.discount.toString().toLocaleLowerCase().includes(args)) ||
                  (this.getDate(val.expiration_date).toLocaleLowerCase().includes(args)) ||
                  (val.quantity.toString().toLocaleLowerCase().includes(args)) ||
                  (val.description.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }


  getDate(created_date){
    return new Date(created_date).toDateString()
  }



}
