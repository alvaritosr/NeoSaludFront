import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerVacunasPacienteComponent } from './ver-vacunas-paciente.component';

describe('VerVacunasPacienteComponent', () => {
  let component: VerVacunasPacienteComponent;
  let fixture: ComponentFixture<VerVacunasPacienteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VerVacunasPacienteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerVacunasPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
