import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerPrescripcionesComponent } from './ver-prescripciones.component';

describe('VerPrescripcionesComponent', () => {
  let component: VerPrescripcionesComponent;
  let fixture: ComponentFixture<VerPrescripcionesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VerPrescripcionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerPrescripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
