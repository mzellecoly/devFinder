import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilEntrepriseComponent } from './accueil-entreprise.component';

describe('AccueilEntrepriseComponent', () => {
  let component: AccueilEntrepriseComponent;
  let fixture: ComponentFixture<AccueilEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilEntrepriseComponent]
    });
    fixture = TestBed.createComponent(AccueilEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
