import { Component } from '@angular/core'
import { FormBuilder } from "@angular/forms"
import { DataService } from 'src/app/data.service'
import { Time } from '../time'
import { PrxtimeComponent } from '../prxtime.component'
import { CommunicationService } from 'src/app/communication.service'

@Component({
  selector: 'app-worked-time',
  templateUrl: './worked-time.component.html',
})
export class WorkedTimeComponent extends PrxtimeComponent {

  public readonly inAM = 'inAM'
  public readonly outAM = 'outAM'
  public readonly inPM = 'inPM'
  public readonly outPM = 'outPM'
  public readonly mssal = 'mssal'

  addToMssal: boolean = false
  workedTime!: Time
  lunchTime!: number


  constructor(private formBuilder: FormBuilder, dataService: DataService, private communicationService: CommunicationService) {
    super(dataService)
    this.prxtimeForm = this.formBuilder.group({
      inAM: this.createFormControlWithValueFromStorage(this.inAM),
      outAM: this.createFormControlWithValueFromStorage(this.outAM),
      inPM: this.createFormControlWithValueFromStorage(this.inPM),
      outPM: this.createFormControlWithValueFromStorage(this.outPM),
    })
  }

  calculateTime(): void {
    if (this.prxtimeForm.valid) {
      const today = this.getCurrentDate()

      const valueInAMForm = this.inAMForm.value;
      const valueOutAMForm = this.outAMForm.value;
      const valueInPMForm = this.inPMForm.value;
      const valueOutPMForm = this.outPMForm.value;

      const startAM = this.createDate(today, valueInAMForm)
      const endAM = this.createDate(today, valueOutAMForm)
      const startPM = this.createDate(today, valueInPMForm)
      const endPM = this.createDate(today, valueOutPMForm)

      this.storeAsWorkingTime(this.inAM, valueInAMForm)
      this.storeAsWorkingTime(this.outAM, valueOutAMForm)
      this.storeAsWorkingTime(this.inPM, valueInPMForm)
      this.storeAsWorkingTime(this.outPM, valueOutPMForm)

      this.calculateWorkedTime(startPM, endAM, startAM, endPM)

      if (this.addToMssal) {
        let toMssal = Time.substractWithDefault(this.workedTime)
        this.storeWorkingTime(this.mssal, toMssal)
        this.communicationService.updateAction(Time.toString(toMssal))
      }

      this.showCalculation = true
    }
  }


  onAddToMssalChange(event: { checked: boolean }) {
    this.addToMssal = event.checked
  }

  private calculateWorkedTime(startPM: Date, endAM: Date, startAM: Date, endPM: Date): void {
    this.lunchTime = this.getLunchTime(startPM, endAM)

    let toRecupLunchTime = 0

    if (this.lunchTime >= 30) {
      toRecupLunchTime = 12
    }

    let lostTime = 0
    if (this.lunchTime < 30) {
      lostTime = 30 - this.lunchTime

    }

    const workedTimeAM = (endAM.getTime() - startAM.getTime()) / 1000 / 60
    const workedTimePM = (endPM.getTime() - startPM.getTime()) / 1000 / 60

    const workedTimeMinutes = workedTimeAM + workedTimePM + toRecupLunchTime - lostTime

    this.workedTime = Time.create(workedTimeMinutes)
  }

  get inAMForm() {
    return this.prxtimeForm.controls[this.inAM]
  }

  get outAMForm() {
    return this.prxtimeForm.controls[this.outAM]
  }

  get inPMForm() {
    return this.prxtimeForm.controls[this.inPM]
  }

  get outPMForm() {
    return this.prxtimeForm.controls[this.outPM]
  }

}
