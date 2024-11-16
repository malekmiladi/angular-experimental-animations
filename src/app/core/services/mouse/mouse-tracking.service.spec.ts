import { TestBed } from '@angular/core/testing';

import { MouseTrackingService } from './mouse-tracking.service';

describe('MouseTrackingService', () => {
  let service: MouseTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MouseTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
