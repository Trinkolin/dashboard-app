import { TestBed } from "@angular/core/testing";
import { DataService } from "src/app/data.service";
import { Ticket } from "../ticket";
import { TicketConsultComponent } from "./ticket-consult.component";

describe("TicketConsultComponent", () => {
  let component: TicketConsultComponent;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketConsultComponent, DataService],
    });
    component = TestBed.inject(TicketConsultComponent);
    dataService = TestBed.inject(DataService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(dataService).toBeTruthy();
  });

  describe("consultTicket", () => {
    beforeEach(() => {
      dataService.removeItem("ticketsInProgress");
    });

    it("should call window.open if isOpenNewPage is true", () => {
      spyOn(window, "open");
      component.isOpenNewPage = true;
      component.ticketFormControl.setValue("1234");
      component.consultTicket();

      expect(window.open).toHaveBeenCalled();
    });

    it("should not call window.open if isOpenNewPage is false", () => {
      spyOn(window, "open");
      component.isOpenNewPage = false;
      component.ticketFormControl.setValue("1234");
      component.consultTicket();

      expect(window.open).not.toHaveBeenCalled();
    });

    it('should open a new window with the link to the ticket when "isOpenNewPage" is true', () => {
      spyOn(window, "open");
      component.isOpenNewPage = true;
      component.bitbucket.controls["ticket"].setValue("ABC-1234");
      component.consultTicket();

      expect(window.open).toHaveBeenCalledWith(
        component.createALinkToTicket("ABC-1234"),
        "_blank"
      );
    });

    it('should not open a new window when "isOpenNewPage" is false', () => {
      spyOn(window, "open");
      component.isOpenNewPage = false;
      component.bitbucket.controls["ticket"].setValue("ABC-1234");
      component.consultTicket();

      expect(window.open).not.toHaveBeenCalled();
    });
  });

  describe("addToTickets", () => {
    beforeEach(() => {
      dataService.removeItem("ticketsInProgress");
    });

    it('should not add a ticket to the list of in-progress tickets if it is already present "isToAddToTickets" is true', () => {
      component.isToAddToTickets = true;

      const ticketArray: Ticket[] = [{ number: "ABC-1234", selected: false }];

      dataService.storeData("ticketsInProgress", ticketArray);
      const ls = component.retrieveFromLocalStorageTicketsInProgress;

      const ticketValue = "ABC-1234";
      component.addToTickets(ticketValue);

      expect(component.retrieveFromLocalStorageTicketsInProgress).toEqual(ls);
    });

    it('should add a ticket to the list of in-progress tickets when "isToAddToTickets" is true', () => {
      component.isToAddToTickets = true;

      const ticketArray: Ticket[] = [];

      dataService.storeData("ticketsInProgress", ticketArray);

      const ticketValue = "ABC-1234";
      component.addToTickets(ticketValue);

      expect(component.retrieveFromLocalStorageTicketsInProgress).toEqual([
        { number: "ABC-1234", selected: false },
      ]);
    });

    it('should not add a ticket to the list of in-progress tickets when "isToAddToTickets" is false', () => {
      component.isToAddToTickets = false;
      const ticketValue = "ABC-1234";

      component.addToTickets(ticketValue);

      expect(component.retrieveFromLocalStorageTicketsInProgress).toEqual([]);
    });
  });

  describe("onIsToAddToTickets", () => {
    it("should set isToAddToTickets to false when event checked is false", () => {
      const event = { checked: false };
      component.onIsToAddToTickets(event);
      expect(component.isToAddToTickets).toBe(false);
    });

    it("should set isToAddToTickets to true when event checked is true", () => {
      const event = { checked: true };
      component.onIsToAddToTickets(event);
      expect(component.isToAddToTickets).toBe(true);
    });
  });

  describe("onOpenNewPage", () => {
    it("should set isOpenNewPage to false when event checked is false", () => {
      const event = { checked: false };
      component.onOpenNewPage(event);
      expect(component.isOpenNewPage).toBe(false);
    });

    it("should set isOpenNewPage to true when event checked is true", () => {
      const event = { checked: true };
      component.onOpenNewPage(event);
      expect(component.isOpenNewPage).toBe(true);
    });
  });
});
