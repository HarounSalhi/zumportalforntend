import { TestBed } from '@angular/core/testing';

import { RemoteworkService } from './remotework.service';

describe('RemoteworkService', () => {
  let service: RemoteworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
