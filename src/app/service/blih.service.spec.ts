import { TestBed, inject } from '@angular/core/testing';

import { BlihService } from './blih.service';

describe('BlihService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlihService]
    });
  });

  it('should be created', inject([BlihService], (service: BlihService) => {
    expect(service).toBeTruthy();
  }));
});
