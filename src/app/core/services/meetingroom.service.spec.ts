import { TestBed } from '@angular/core/testing';

import { MeeingroomService } from './meetingroom.service';

describe('MeeingroomService', () => {
  let service: MeeingroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeeingroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
