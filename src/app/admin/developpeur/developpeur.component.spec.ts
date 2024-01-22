import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloppeurComponent } from './developpeur.component';

describe('DeveloppeurComponent', () => {
  let component: DeveloppeurComponent;
  let fixture: ComponentFixture<DeveloppeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeveloppeurComponent]
    });
    fixture = TestBed.createComponent(DeveloppeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
