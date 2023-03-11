import { TestBed } from '@angular/core/testing';
import { CommunicationService } from './communication.service';

describe('CommunicationService', () => {
  let service: CommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommunicationService]
    });
    service = TestBed.inject(CommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update action', (done: DoneFn) => {
    const mockAction = { id: 1, name: 'test' };
    service.action$.subscribe(action => {
      expect(action).toEqual(mockAction);
      done();
    });
    service.updateAction(mockAction);
  });
});