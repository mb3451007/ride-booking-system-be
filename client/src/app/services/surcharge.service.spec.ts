import { TestBed } from '@angular/core/testing';

import { SurchargeService } from './surcharge.service';

describe('SurchargeService', () => {
  let service: SurchargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurchargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
