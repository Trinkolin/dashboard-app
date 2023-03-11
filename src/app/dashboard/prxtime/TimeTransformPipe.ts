import { Pipe, PipeTransform } from '@angular/core'
import { Time } from './time'

@Pipe({
  name: 'timeTransformPipe'
})
export class TimeTransformPipe implements PipeTransform {
  transform(value: any, args?: any): string {
    return Time.toString(value)
  }
}
