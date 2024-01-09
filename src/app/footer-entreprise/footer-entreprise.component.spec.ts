import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterEntrepriseComponent } from './footer-entreprise.component';

describe('FooterEntrepriseComponent', () => {
  let component: FooterEntrepriseComponent;
  let fixture: ComponentFixture<FooterEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterEntrepriseComponent]
    });
    fixture = TestBed.createComponent(FooterEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
