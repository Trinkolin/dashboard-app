import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BitbucketComponent } from './bitbucket.component'

import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatButtonModule } from "@angular/material/button"
import { MatTabsModule } from "@angular/material/tabs"
import { MatListModule } from "@angular/material/list"
import { MatGridListModule } from "@angular/material/grid-list"
import { TicketConsultComponent } from './ticket-consult/ticket-consult.component'
import { TicketListComponent } from './ticket-list/ticket-list.component'


@NgModule({
  declarations: [
    TicketConsultComponent,
    TicketListComponent,
    BitbucketComponent
  ],
  exports: [
    BitbucketComponent,
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
    CommonModule
  ]
})
export class BitbucketModule {
}
