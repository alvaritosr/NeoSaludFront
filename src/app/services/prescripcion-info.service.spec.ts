import { TestBed } from '@angular/core/testing';

import { PrescripcionInfoService } from './prescripcion-info.service';

describe('PrescripcionInfoService', () => {
  let service: PrescripcionInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescripcionInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
