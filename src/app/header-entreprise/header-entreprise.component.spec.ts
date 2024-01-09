import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEntrepriseComponent } from './header-entreprise.component';

describe('HeaderEntrepriseComponent', () => {
  let component: HeaderEntrepriseComponent;
  let fixture: ComponentFixture<HeaderEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderEntrepriseComponent]
    });
    fixture = TestBed.createComponent(HeaderEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
