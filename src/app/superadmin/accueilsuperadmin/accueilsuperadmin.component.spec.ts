import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilsuperadminComponent } from './accueilsuperadmin.component';

describe('AccueilsuperadminComponent', () => {
  let component: AccueilsuperadminComponent;
  let fixture: ComponentFixture<AccueilsuperadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilsuperadminComponent]
    });
    fixture = TestBed.createComponent(AccueilsuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
