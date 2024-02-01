import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaindevComponent } from './maindev.component';

describe('MaindevComponent', () => {
  let component: MaindevComponent;
  let fixture: ComponentFixture<MaindevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaindevComponent]
    });
    fixture = TestBed.createComponent(MaindevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
