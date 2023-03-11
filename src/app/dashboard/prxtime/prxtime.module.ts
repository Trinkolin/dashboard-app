import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MssalComponent } from "./mssal/mssal.component";
import { WorkedTimeComponent } from "./worked-time/worked-time.component";
import { PrxtimeComponent } from "./prxtime.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { LunchBreakComponent } from './lunch-break/lunch-break.component';
import { TimeTransformPipe } from './TimeTransformPipe';
import { DisplayBreakLengthComponent } from './shared/display-break-length/display-break-length.component';
import { ForecastMssalComponent } from './mssal-forecast/mssal-forecast.component';

@NgModule({
  declarations: [
    MssalComponent,
    WorkedTimeComponent,
    PrxtimeComponent,
    LunchBreakComponent,
    TimeTransformPipe,
    DisplayBreakLengthComponent,
    ForecastMssalComponent,
  ],
  exports: [
    PrxtimeComponent,
    TimeTransformPipe
  ],
  imports: [
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatChipsModule,

    CommonModule
  ]
})
export class PrxtimeModule {
}
