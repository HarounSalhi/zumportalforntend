import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EquipmentlistComponent } from './equipmentlist.component';

describe('EquipmentlistComponent', () => {
  let component: EquipmentlistComponent;
  let fixture: ComponentFixture<EquipmentlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
