import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { DataService } from 'src/app/data.service'
import { PrxtimeComponent } from '../prxtime.component'

@Component({
  selector: 'app-lunch-break',
  templateUrl: './lunch-break.component.html',
})
export class LunchBreakComponent extends PrxtimeComponent implements OnInit {

  private readonly startLunchTime = 'startLunchTime'
  private readonly endLunchTime = 'endLunchTime'
  lunchTime!: number

  constructor(private formBuilder: FormBuilder, dataService: DataService) {
    super(dataService)
  }

  ngOnInit(): void {
    this.prxtimeForm = this.formBuilder.group({
      startLunchTime: this.createFormControlWithValueFromStorage(this.startLunchTime),
      endLunchTime: this.createFormControlWithValueFromStorage(this.endLunchTime)
    })
  }

  calculateLunchTime(): void {
    if (this.prxtimeForm.valid) {
      const today = this.getCurrentDate()

      const startLunchTime = this.startLunchTimeForm.value
      const endLunchTime = this.endLunchTimeForm.value

      this.storeAsWorkingTime(this.startLunchTime, startLunchTime)
      this.storeAsWorkingTime(this.endLunchTime, endLunchTime)

      this.lunchTime = this.getLunchTime(this.createDate(today, endLunchTime), this.createDate(today, startLunchTime))

      this.showCalculation = true
    }
  }

  get startLunchTimeForm() {
    return this.prxtimeForm.controls[this.startLunchTime]
  }

  get endLunchTimeForm() {
    return this.prxtimeForm.controls[this.endLunchTime]
  }

}
