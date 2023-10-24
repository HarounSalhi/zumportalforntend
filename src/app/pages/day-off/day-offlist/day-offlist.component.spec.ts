import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Day-offlistComponent } from './day-offlist.component';

describe('Day-offlistComponent', () => {
  let component: Day-offlistComponent;
  let fixture: ComponentFixture<Day-offlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Day-offlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Day-offlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
