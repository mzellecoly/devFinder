import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilComponent } from './edit-profil.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from '../header/header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EditProfilComponent', () => {
  let component: EditProfilComponent;
  let fixture: ComponentFixture<EditProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfilComponent,
      HeaderComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        DataTablesModule,
        HttpClientModule,
        EditorModule,
        RouterModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(EditProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
