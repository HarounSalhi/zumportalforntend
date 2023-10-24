import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeetingroomgridComponent } from './meetingroomgrid.component';

describe('MeetingroomgridComponent', () => {
  let component: MeetingroomgridComponent;
  let fixture: ComponentFixture<MeetingroomgridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingroomgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingroomgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
