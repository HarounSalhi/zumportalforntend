import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EquipmentgridComponent } from './equipmentgrid.component';

describe('EquipmentgridComponent', () => {
  let component: EquipmentgridComponent;
  let fixture: ComponentFixture<EquipmentgridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
