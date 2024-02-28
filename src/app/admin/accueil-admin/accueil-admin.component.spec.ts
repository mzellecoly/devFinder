import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilAdminComponent } from './accueil-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('AccueilAdminComponent', () => {
  let component: AccueilAdminComponent;
  let fixture: ComponentFixture<AccueilAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilAdminComponent],
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
    fixture = TestBed.createComponent(AccueilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
