import { TestBed, inject } from '@angular/core/testing';

import { RoutesInfoService } from './routes-info.service';

describe('RoutesInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutesInfoService]
    });
  });

  it('should be created', inject([RoutesInfoService], (service: RoutesInfoService) => {
    expect(service).toBeTruthy();
  }));
});
