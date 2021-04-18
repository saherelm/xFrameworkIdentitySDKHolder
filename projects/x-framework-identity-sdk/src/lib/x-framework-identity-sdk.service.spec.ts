import { TestBed } from '@angular/core/testing';

import { XFrameworkIdentitySdkService } from './x-framework-identity-sdk.service';

describe('XFrameworkIdentitySdkService', () => {
  let service: XFrameworkIdentitySdkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XFrameworkIdentitySdkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
