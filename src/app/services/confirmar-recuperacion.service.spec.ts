import { TestBed } from '@angular/core/testing';

import { ConfirmarRecuperacionService } from './confirmar-recuperacion.service';

describe('ConfirmarRecuperacionService', () => {
  let service: ConfirmarRecuperacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmarRecuperacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
