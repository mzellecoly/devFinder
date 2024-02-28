import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaindevComponent } from './maindev.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';

describe('MaindevComponent', () => {
  let component: MaindevComponent;
  let fixture: ComponentFixture<MaindevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaindevComponent,
        SidebarComponent,
        HeaderComponent,],
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
    fixture = TestBed.createComponent(MaindevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
