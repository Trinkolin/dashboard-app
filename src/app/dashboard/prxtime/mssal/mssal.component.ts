import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { DataService } from 'src/app/data.service'
import { Time } from '../time'
import { PrxtimeComponent } from '../prxtime.component'
import { CommunicationService } from 'src/app/communication.service'

@Component({
  selector: 'app-mssal',
  templateUrl: './mssal.component.html',
})
export class MssalComponent extends PrxtimeComponent implements OnInit {

  private readonly mssal = 'mssal'
  private readonly offset = 'offset'

  newMSSAL!: Time
  toRemove: boolean = false

  constructor(private formBuilder: FormBuilder, dataService: DataService, private communicationService: CommunicationService) {
    super(dataService)
    this.prxtimeForm = formBuilder.group({
      mssal: this.createFormControlWithValueFromStorage(this.mssal),
      offset: this.createFormControlWithValueFromStorage('', false),
    })
  }

  ngOnInit() {
    this.communicationService.action$.subscribe((p) => {
      this.mssalForm.setValue(Time.toString(Time.add(this.mssalForm.value, p as string)))
    })
  }

  calculateMSSAL() {
    this.offsetForm.markAsTouched()

    if (this.prxtimeForm.valid) {
      if (this.toRemove) {
        this.newMSSAL = Time.substract(this.mssalForm.value, this.offsetForm.value)
      } else {
        this.newMSSAL = Time.add(this.mssalForm.value, this.offsetForm.value)
      }

      this.mssalForm.setValue(Time.toString(this.newMSSAL))
      this.offsetForm.setValue('00:00')

      this.storeWorkingTime(this.mssal, this.newMSSAL)

      this.showCalculation = true
    }
  }

  onToRemoveChange(event: { checked: boolean }) {
    this.toRemove = event.checked
  }

  get mssalForm() {
    return this.prxtimeForm.controls[this.mssal]
  }

  get offsetForm() {
    return this.prxtimeForm.controls[this.offset]
  }
}
