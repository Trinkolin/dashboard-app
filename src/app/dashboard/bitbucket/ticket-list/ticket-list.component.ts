import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { DataService } from 'src/app/data.service'
import { CommunicationService } from '../../../communication.service'
import { Ticket } from '../ticket'
import { BitbucketComponent } from '../bitbucket.component'
import { Utils } from "../../Utils"

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
})
export class TicketListComponent extends BitbucketComponent implements OnInit {
  selectedTicketsData: Ticket[] = []

  constructor(private formBuilder: FormBuilder, dataService: DataService, private communicationService: CommunicationService) {
    super(dataService)
    this.selectedTicketsData = this.retrieveFromLocalStorageTicketsInProgress.slice()
  }

  ngOnInit() {
    this.communicationService.action$.subscribe((ticket) => {
      this.selectedTicketsData.push(ticket as Ticket)
    })
  }

  deleteSelectedTickets(): void {
    const filteredTickets = this.retrieveFromLocalStorageTicketsInProgress.filter(
      (ticket: Ticket) => !this.isInSelected(this.selectedTicketsData, ticket)
    )

    this.storeInLocalStorageForTicketsInProgress(filteredTickets)
    this.selectedTicketsData = this.retrieveFromLocalStorageTicketsInProgress.slice()
  }

  saveSelectedTickets(): void {
    const updatedTickets = this.retrieveFromLocalStorageTicketsInProgress.map((ticket: Ticket) => ({
      ...ticket,
      selected: this.isInSelected(this.selectedTicketsData, ticket)
    }))
    this.storeInLocalStorageForTicketsInProgress(updatedTickets)
  }

  isInSelected(ticketArray: Ticket[], ticket: Ticket): boolean {
    return !Utils.isEmpty(ticketArray) && ticketArray.some(t => t.number === ticket.number && t.selected)
  }
}