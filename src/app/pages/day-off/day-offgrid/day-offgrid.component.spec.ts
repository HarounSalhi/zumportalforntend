import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Day-offgridComponent } from './day-offgrid.component';

describe('Day-offgridComponent', () => {
  let component: Day-offgridComponent;
  let fixture: ComponentFixture<Day-offgridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Day-offgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Day-offgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
