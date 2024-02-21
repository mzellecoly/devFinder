import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { assoguardGuard } from './assoguard.guard';

describe('assoguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => assoguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
