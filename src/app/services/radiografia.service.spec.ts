import { TestBed } from '@angular/core/testing';

import { RadiografiaService } from './radiografia.service';

describe('RadiografiaService', () => {
  let service: RadiografiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadiografiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
