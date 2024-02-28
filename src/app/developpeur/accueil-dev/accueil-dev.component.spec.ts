import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilDevComponent } from './accueil-dev.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('AccueilDevComponent', () => {
  let component: AccueilDevComponent;
  let fixture: ComponentFixture<AccueilDevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilDevComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        DataTablesModule,
        HttpClientModule,
        EditorModule,
        RouterModule
      ],
    });
    fixture = TestBed.createComponent(AccueilDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
