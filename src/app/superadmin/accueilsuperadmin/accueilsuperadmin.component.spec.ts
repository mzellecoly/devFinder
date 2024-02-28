import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilsuperadminComponent } from './accueilsuperadmin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('AccueilsuperadminComponent', () => {
  let component: AccueilsuperadminComponent;
  let fixture: ComponentFixture<AccueilsuperadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilsuperadminComponent],
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
    fixture = TestBed.createComponent(AccueilsuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
