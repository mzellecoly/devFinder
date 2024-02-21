import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { appguardGuard } from './appguard.guard';

describe('appguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => appguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
