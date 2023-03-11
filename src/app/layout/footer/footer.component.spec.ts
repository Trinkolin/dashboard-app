import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';


describe('FooterComponent', () => {
  let footerComponent: FooterComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FooterComponent]
    });
    footerComponent = TestBed.inject(FooterComponent);
  });

  it('should be created', () => {
    expect(footerComponent).toBeTruthy();
  });

});