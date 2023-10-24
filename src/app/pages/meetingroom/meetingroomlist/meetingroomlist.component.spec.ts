import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeetingroomlistComponent } from './meetingroomlist.component';

describe('MeetingroomlistComponent', () => {
  let component: MeetingroomlistComponent;
  let fixture: ComponentFixture<MeetingroomlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingroomlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingroomlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
