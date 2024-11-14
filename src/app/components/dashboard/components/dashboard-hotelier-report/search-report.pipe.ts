import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customerReportFilter'
})
export class SearchReportPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.title.toLocaleLowerCase().includes(args)) ||
                  (this.getDate(val.created_date).toLocaleLowerCase().includes(args));
      return rVal;
    })

  }


  getDate(created_date){
    return new Date(created_date).toDateString()
  }



}
