import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilRecrueComponent } from './profil-recrue.component';

describe('ProfilRecrueComponent', () => {
  let component: ProfilRecrueComponent;
  let fixture: ComponentFixture<ProfilRecrueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilRecrueComponent]
    });
    fixture = TestBed.createComponent(ProfilRecrueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
