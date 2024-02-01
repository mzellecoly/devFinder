import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionlangageComponent } from './gestionlangage.component';

describe('GestionlangageComponent', () => {
  let component: GestionlangageComponent;
  let fixture: ComponentFixture<GestionlangageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionlangageComponent]
    });
    fixture = TestBed.createComponent(GestionlangageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
