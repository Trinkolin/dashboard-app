import { TestBed } from '@angular/core/testing';
import { DataService } from 'src/app/data.service';
import { BitbucketComponent } from './bitbucket.component';

describe('BitbucketComponent', () => {
    let component: BitbucketComponent;
    let dataService: DataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BitbucketComponent, DataService]
        });
        component = TestBed.inject(BitbucketComponent);
        dataService = TestBed.inject(DataService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(dataService).toBeTruthy();
    });

    describe('localStorageForTicketsInProgress', () => {
        beforeEach(() => {
            dataService.removeItem('ticketsInProgress')
        });

        it('should retrieve data from local storage if present', () => {
            const ticket = { number: 'ABC-1234', selected: false }
            component.storeInLocalStorageForTicketsInProgress(ticket);

            expect(component.retrieveFromLocalStorageTicketsInProgress).toEqual(ticket);
        });

        it('should not retrieve data from local storage if not present', () => {
            const ticket = { number: 'ABC-1234', selected: false }

            expect(component.retrieveFromLocalStorageTicketsInProgress).not.toEqual(ticket);
        });
    })

    describe('storeInLocalStorageForTicketsInProgress', () => {
        beforeEach(() => {
            dataService.removeItem('ticketsInProgress')
        });

        it('should store data in local storage', () => {
            const ticket = { number: 'ABC-1234', selected: false }

            component.storeInLocalStorageForTicketsInProgress(ticket);

            expect(component.retrieveFromLocalStorageTicketsInProgress).toEqual(ticket);
        });
    })

    describe('createALinkToTicket', () => {
        it('should create a link to a ticket', () => {
            const ticketValue = 'ABC-123';
            const expectedLink = 'http://jira/browse/ABC-123';

            const result = component.createALinkToTicket(ticketValue);
            expect(result).toEqual(expectedLink);
        });
    })

});