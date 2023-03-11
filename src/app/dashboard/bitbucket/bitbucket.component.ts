import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Ticket } from './ticket';

@Component({
  selector: 'app-bitbucket',
  templateUrl: './bitbucket.component.html',
})
export class BitbucketComponent {

  private readonly TICKETS_PROGRESS = 'ticketsInProgress'

  bitbucket!: FormGroup

  constructor(private dataService: DataService) {
  }

  get retrieveFromLocalStorageTicketsInProgress() {
    return this.dataService.getData(this.TICKETS_PROGRESS) ?? [];
  }

  storeInLocalStorageForTicketsInProgress(value: any) {
    return this.dataService.storeData(this.TICKETS_PROGRESS, value);
  }

  createALinkToTicket(ticketValue: string) {
    return Ticket.createALinkToTicket(ticketValue)
  }

}
