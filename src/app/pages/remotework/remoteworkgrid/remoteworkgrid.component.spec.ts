import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RemoteworkgridComponent } from './remoteworkgrid.component';

describe('RemoteworkgridComponent', () => {
  let component: RemoteworkgridComponent;
  let fixture: ComponentFixture<RemoteworkgridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteworkgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteworkgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
