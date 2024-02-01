import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilDevComponent } from './accueil-dev.component';

describe('AccueilDevComponent', () => {
  let component: AccueilDevComponent;
  let fixture: ComponentFixture<AccueilDevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilDevComponent]
    });
    fixture = TestBed.createComponent(AccueilDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
