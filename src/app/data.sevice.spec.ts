import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store data in local storage', () => {
    const key = 'test-key1';
    const value = { name: 'test-value' };
    service.storeData(key, value);
    const data = JSON.parse(localStorage.getItem(key) as string);
    expect(data).toEqual(value);
  });

  it('should retrieve data from local storage', () => {
    const key = 'test-key2';
    const value = { name: 'test-value' };
    localStorage.setItem(key, JSON.stringify(value));
    const data = service.getData(key);
    expect(data).toEqual(value);
  });

  it('should return null when data is not found in local storage', () => {
    const key = 'test-key3';
    const data = service.getData(key);
    console.log(data);
    expect(data).toBeNull();
  });
});
