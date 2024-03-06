import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authForLoginGuard } from './auth-for-login.guard';

describe('authForLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authForLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
