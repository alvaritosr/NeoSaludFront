import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuSuperiorComponent } from './menu-superior.component';

describe('MenuSuperiorComponent', () => {
  let component: MenuSuperiorComponent;
  let fixture: ComponentFixture<MenuSuperiorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MenuSuperiorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuSuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
