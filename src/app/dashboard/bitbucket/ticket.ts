export class Ticket {
  number: string;
  selected: boolean;

  constructor(number: string, selected: boolean) {
    this.number = number;
    this.selected = selected;
  }


  static createALinkToTicket(value: string) {
    return `http://jira/browse/${value}`
  }
}
