import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdminComponent } from './main-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';

describe('MainAdminComponent', () => {
  let component: MainAdminComponent;
  let fixture: ComponentFixture<MainAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainAdminComponent,
      SidebarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    fixture = TestBed.createComponent(MainAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
