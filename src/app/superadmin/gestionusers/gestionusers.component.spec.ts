import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionusersComponent } from './gestionusers.component';

describe('GestionusersComponent', () => {
  let component: GestionusersComponent;
  let fixture: ComponentFixture<GestionusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionusersComponent]
    });
    fixture = TestBed.createComponent(GestionusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
