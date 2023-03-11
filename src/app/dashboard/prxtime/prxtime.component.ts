import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/data.service'
import { Utils } from '../Utils'
import { Time } from './time'

@Component({
  selector: 'app-prxtime',
  templateUrl: './prxtime.component.html',
})
export class PrxtimeComponent {

  prxtimeForm!: FormGroup
  showCalculation: boolean

  constructor(private dataService: DataService) {
    this.showCalculation = false
  }

  public createFormControlWithValueFromStorage(localStorageKey: string, storage: boolean = true): FormControl {
    let value: string = "00:00"
    if (storage) {
      let k = this.dataService.getData("prxtime_" + localStorageKey);
      if (Utils.isNotBlank(k)) {
        value = Time.toString(k)
      }
    }

    return new FormControl(value, [Validators.required, Validators.pattern(this.getTimePattern)])
  }

  public storeAsWorkingTime(localStorageKey: string, value: string): void {
    this.dataService.storeData("prxtime_" + localStorageKey, Time.toTime(value))
  }

  public storeWorkingTime(localStorageKey: string, value: Time): void {
    this.dataService.storeData("prxtime_" + localStorageKey, (value))
  }

  getLunchTime(startPM: Date, endAM: Date): number {
    return (startPM.getTime() - endAM.getTime()) / 1000 / 60
  }

  getCurrentDate(): string {
    let currentDate = new Date()
    return currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
  }

  createDate(today: string, value: string): Date {
    return new Date(today + ' ' + value)
  }

  get getTimePattern() {
    return '^([0-1][0-9]|2[0-3]):[0-5][0-9]$'
  }

}
