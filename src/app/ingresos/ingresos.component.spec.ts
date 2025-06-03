import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngresosComponent } from './ingresos.component';

describe('IngresosComponent', () => {
  let component: IngresosComponent;
  let fixture: ComponentFixture<IngresosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IngresosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
