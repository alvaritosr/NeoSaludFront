import { TestBed } from '@angular/core/testing';

import { RecuperarCuentaService } from './recuperar-cuenta.service';

describe('RecuperarCuentaService', () => {
  let service: RecuperarCuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperarCuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
