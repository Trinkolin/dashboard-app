import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { PrxtimeComponent } from '../prxtime.component';
import { Time } from '../time';

@Component({
  selector: 'app-mssal-forecast',
  templateUrl: './mssal-forecast.component.html',
})
export class ForecastMssalComponent extends PrxtimeComponent {

  private readonly mssal = 'mssal'
  private readonly offset = 'offset'
  isForecast: boolean = false
  forecastTime!: Time

  constructor(private formBuilder: FormBuilder, dataService: DataService) {
    super(dataService)
    this.prxtimeForm = formBuilder.group({
      mssal: this.createFormControlWithValueFromStorage(this.mssal),
      offset: this.createFormControlWithValueFromStorage('', false),
    })
  }

  forecast(): void {
    this.offsetForm.markAsTouched()

    if (this.prxtimeForm.valid) {
      if (this.isForecast) {
        this.forecastTime = Time.substract(this.mssalForm.value, this.offsetForm.value)
      } else {
        this.forecastTime = Time.add(this.mssalForm.value, this.offsetForm.value)
      }

      this.showCalculation = true
    }
  }

  onToIsForecastChange(event: { checked: boolean }) {
    this.isForecast = event.checked
  }

  get mssalForm() {
    return this.prxtimeForm.controls[this.mssal]
  }

  get offsetForm() {
    return this.prxtimeForm.controls[this.offset]
  }
}
