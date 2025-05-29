import { TestBed } from '@angular/core/testing';

import { TacService } from './tac.service';

describe('TacService', () => {
  let service: TacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
