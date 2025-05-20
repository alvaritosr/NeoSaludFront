import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecuperarCuentaComponent } from './recuperar-cuenta.component';

describe('RecuperarCuentaComponent', () => {
  let component: RecuperarCuentaComponent;
  let fixture: ComponentFixture<RecuperarCuentaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RecuperarCuentaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
