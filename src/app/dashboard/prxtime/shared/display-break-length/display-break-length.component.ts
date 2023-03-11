import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-break-length',
  templateUrl: './display-break-length.component.html',
})
export class DisplayBreakLengthComponent {
  @Input()
  lunchTime!: number;

  @Input()
  showCalculation!: boolean;
}
