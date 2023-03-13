import { Component } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { DataService } from 'src/app/data.service'
import { CommunicationService } from '../../../communication.service'
import { BitbucketComponent } from '../bitbucket.component';
import { Ticket } from "../ticket";

@Component({
  selector: 'app-ticket-consult',
  templateUrl: './ticket-consult.component.html',
})
export class TicketConsultComponent extends BitbucketComponent {

  isToAddToTickets: boolean = false
  isOpenNewPage: boolean = false

  constructor(private formBuilder: FormBuilder, private communicationService: CommunicationService, dataService: DataService,) {
    super(dataService);

    this.bitbucket = this.formBuilder.group({
      ticket: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  consultTicket(): void {
    if (this.ticketFormControl.valid) {
      const ticketValue = this.ticketFormControl.value;

      this.addToTickets(ticketValue)

      if (this.isOpenNewPage) {
        window.open(this.createALinkToTicket(ticketValue), "_blank")
      }
    }
  }

  addToTickets(ticketValue: string): void {
    if (this.isToAddToTickets) {
      let localStorageTickets: Ticket[] = this.retrieveFromLocalStorageTicketsInProgress
      let shouldUpdateTickets = false;

      let ticket = new Ticket(ticketValue, false);

      let t = this.find(localStorageTickets, ticketValue)

      if (t == null) {
        localStorageTickets.push(ticket)
        shouldUpdateTickets = true;
      }

      console.log(shouldUpdateTickets);

      if (shouldUpdateTickets) {
        this.storeInLocalStorageForTicketsInProgress(localStorageTickets);
        this.communicationService.updateAction(ticket);
      }
    }
  }

  private find(tickets: Ticket[], number: string) {
    console.log(tickets)
    for (const ticket of tickets) {
      if (ticket.number.toString() === number) {
        console.log(ticket)
        return ticket;
      }
    }
    return null;
  }

  onIsToAddToTickets(event: { checked: boolean }): void {
    this.isToAddToTickets = event.checked
  }

  onOpenNewPage(event: { checked: boolean }): void {
    this.isOpenNewPage = event.checked
  }

  get ticketFormControl(): any {
    return this.bitbucket.controls['ticket']
  }

}
