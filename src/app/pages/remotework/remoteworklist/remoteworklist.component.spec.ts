import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RemoteworklistComponent } from './remoteworklist.component';

describe('RemoteworklistComponent', () => {
  let component: RemoteworklistComponent;
  let fixture: ComponentFixture<RemoteworklistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteworklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteworklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
