import { TestBed } from '@angular/core/testing';

import { AlerttifyService } from './alerttify.service';

describe('AlerttifyService', () => {
  let service: AlerttifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlerttifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
