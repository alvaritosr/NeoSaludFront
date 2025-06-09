import { TestBed } from '@angular/core/testing';

import { HabitosVidaService } from './habitos-vida.service';

describe('HabitosVidaService', () => {
  let service: HabitosVidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitosVidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
