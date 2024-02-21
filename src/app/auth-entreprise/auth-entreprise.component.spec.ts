import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEntrepriseComponent } from './auth-entreprise.component';

describe('AuthEntrepriseComponent', () => {
  let component: AuthEntrepriseComponent;
  let fixture: ComponentFixture<AuthEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthEntrepriseComponent]
    });
    fixture = TestBed.createComponent(AuthEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
