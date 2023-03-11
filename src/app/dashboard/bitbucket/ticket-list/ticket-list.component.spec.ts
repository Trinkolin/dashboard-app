import { TestBed } from "@angular/core/testing"
import { of } from "rxjs"
import { CommunicationService } from "src/app/communication.service"
import { DataService } from "src/app/data.service"
import { Ticket } from "../ticket"
import { TicketListComponent } from "./ticket-list.component"

describe('TicketListComponent', () => {

  let component: TicketListComponent
  let dataService: DataService
  let communicationService: CommunicationService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketListComponent, DataService]
    })
    component = TestBed.inject(TicketListComponent)
    dataService = TestBed.inject(DataService)
    communicationService = TestBed.inject(CommunicationService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('deleteSelectedTickets', () => {
    beforeEach(() => {
      dataService.removeItem('ticketsInProgress')
    })

    it('should remove selected tickets from local storage', () => {
      const ticketArray: Ticket[] = [
        { number: 'ABC-1234', selected: false },
        { number: 'ABC-1235', selected: false },
      ]

      dataService.storeData('ticketsInProgress', ticketArray)
      const ls = component.retrieveFromLocalStorageTicketsInProgress

      component.selectedTicketsData = [{ number: 'ABC-1234', selected: true }, { number: 'ABC-1235', selected: false }]

      component.deleteSelectedTickets()

      expect(component.retrieveFromLocalStorageTicketsInProgress).not.toEqual(ls)
      expect(component.retrieveFromLocalStorageTicketsInProgress).toEqual([{ number: 'ABC-1235', selected: false }])
      expect(component.selectedTicketsData).toEqual([{ number: 'ABC-1235', selected: false }])
    })


    it('should removed nothing from local storage', () => {
      const ticketArray: Ticket[] = [
        { number: 'ABC-1234', selected: false },
        { number: 'ABC-1235', selected: false },
      ]

      dataService.storeData('ticketsInProgress', ticketArray)
      const ls = component.retrieveFromLocalStorageTicketsInProgress

      component.selectedTicketsData = [{ number: 'ABC-1234', selected: false }, { number: 'ABC-1235', selected: false }]

      component.deleteSelectedTickets()

      expect(component.retrieveFromLocalStorageTicketsInProgress).toEqual(ls)
      expect(component.retrieveFromLocalStorageTicketsInProgress).toEqual([{ number: 'ABC-1234', selected: false }, { number: 'ABC-1235', selected: false }])
      expect(component.selectedTicketsData).toEqual([{ number: 'ABC-1234', selected: false }, { number: 'ABC-1235', selected: false }])
    })
  })

  describe('saveSelectedTickets', () => {
    beforeEach(() => {
      dataService.removeItem('ticketsInProgress')
    })

    it('should save the selected tickets if any selected', () => {
      const ticketArray: Ticket[] = [
        { number: 'ABC-1234', selected: false },
        { number: 'ABC-1235', selected: false },
      ]

      dataService.storeData('ticketsInProgress', ticketArray)
      const ls = component.retrieveFromLocalStorageTicketsInProgress

      component.selectedTicketsData = [{ number: 'ABC-1234', selected: true }, { number: 'ABC-1235', selected: false }]

      component.saveSelectedTickets()

      expect(component.retrieveFromLocalStorageTicketsInProgress).not.toEqual(ls)
      expect(component.retrieveFromLocalStorageTicketsInProgress).toEqual([{ number: 'ABC-1234', selected: true }, { number: 'ABC-1235', selected: false }])
      expect(component.selectedTicketsData).toEqual([{ number: 'ABC-1234', selected: true }, { number: 'ABC-1235', selected: false }])
    })

    it('should not change the selected tickets if none are selected', () => {
      const ticketArray: Ticket[] = [
        { number: 'ABC-1234', selected: false },
        { number: 'ABC-1235', selected: false },
      ]

      dataService.storeData('ticketsInProgress', ticketArray)
      const ls = component.retrieveFromLocalStorageTicketsInProgress

      component.selectedTicketsData = [{ number: 'ABC-1234', selected: false }, { number: 'ABC-1235', selected: false }]

      component.saveSelectedTickets()

      expect(component.retrieveFromLocalStorageTicketsInProgress).toEqual(ls)
      expect(component.retrieveFromLocalStorageTicketsInProgress).toEqual([{ number: 'ABC-1234', selected: false }, { number: 'ABC-1235', selected: false }])
      expect(component.selectedTicketsData).toEqual([{ number: 'ABC-1234', selected: false }, { number: 'ABC-1235', selected: false }])
    })
  })

  describe('isInSelected', () => {
    beforeEach(() => {
      dataService.removeItem('ticketsInProgress')
    })

    it('should return false if the array is empty', () => {
      const ticketArray: Ticket[] = []
      const ticket: Ticket = { number: 'ABC-1234', selected: false }

      expect(component.isInSelected(ticketArray, ticket)).toEqual(false)
    })

    it('should return false if the array contains the ticket with flag selected at false', () => {
      const ticketArray: Ticket[] = [{ number: 'ABC-1234', selected: false }]
      const ticket: Ticket = { number: 'ABC-1234', selected: false }

      expect(component.isInSelected(ticketArray, ticket)).toEqual(false)
    })

    it('should return false if the array does not contain the ticket', () => {
      const ticketArray: Ticket[] = [{ number: 'ABC-1234', selected: false }]
      const ticket: Ticket = { number: 'ABC-1235', selected: false }

      expect(component.isInSelected(ticketArray, ticket)).toEqual(false)
    })

    it('should return true if the array contains the ticket with flag selected at true', () => {
      const ticketArray: Ticket[] = [{ number: 'ABC-1234', selected: true }]
      const ticket: Ticket = { number: 'ABC-1234', selected: true }

      expect(component.isInSelected(ticketArray, ticket)).toEqual(true)
    })
  })

  describe('ngOnInit', () => {

    it('should add a new ticket to selectedTicketsData when an event is received', () => {
      const ticket: Ticket = { number: 'ABC-1234', selected: false }
      communicationService.action$ = of(ticket)
      component.ngOnInit()
      expect(component.selectedTicketsData).toContain(ticket)
    })

  })

})