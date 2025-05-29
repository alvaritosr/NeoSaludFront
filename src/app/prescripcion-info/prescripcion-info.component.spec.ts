import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrescripcionInfoComponent } from './prescripcion-info.component';

describe('PrescripcionInfoComponent', () => {
  let component: PrescripcionInfoComponent;
  let fixture: ComponentFixture<PrescripcionInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PrescripcionInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrescripcionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
