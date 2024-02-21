import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAssoComponent } from './auth-asso.component';

describe('AuthAssoComponent', () => {
  let component: AuthAssoComponent;
  let fixture: ComponentFixture<AuthAssoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthAssoComponent]
    });
    fixture = TestBed.createComponent(AuthAssoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
