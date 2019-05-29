import { TestBed } from '@angular/core/testing';

import { LoginActivateService } from './login-activate.service';

describe('LoginActivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginActivateService = TestBed.get(LoginActivateService);
    expect(service).toBeTruthy();
  });
});
