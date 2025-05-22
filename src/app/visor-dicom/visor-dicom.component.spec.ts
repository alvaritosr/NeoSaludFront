import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisorDicomComponent } from './visor-dicom.component';

describe('VisorDicomComponent', () => {
  let component: VisorDicomComponent;
  let fixture: ComponentFixture<VisorDicomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VisorDicomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VisorDicomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
