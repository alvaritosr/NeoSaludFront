import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VacunasComponent } from './vacunas.component';

describe('VacunasComponent', () => {
  let component: VacunasComponent;
  let fixture: ComponentFixture<VacunasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VacunasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VacunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
