import { TestBed, inject } from '@angular/core/testing';

import { ContributorsService } from './contributors.service';

describe('ContributorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContributorsService]
    });
  });

  it('should be created', inject([ContributorsService], (service: ContributorsService) => {
    expect(service).toBeTruthy();
  }));
});
