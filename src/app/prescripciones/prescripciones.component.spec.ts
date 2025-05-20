import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrescripcionesComponent } from './prescripciones.component';

describe('PrescripcionesComponent', () => {
  let component: PrescripcionesComponent;
  let fixture: ComponentFixture<PrescripcionesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PrescripcionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrescripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
