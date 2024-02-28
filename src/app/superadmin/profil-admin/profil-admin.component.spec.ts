import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAdminComponent } from './profil-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';

describe('ProfilAdminComponent', () => {
  let component: ProfilAdminComponent;
  let fixture: ComponentFixture<ProfilAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilAdminComponent,
        SidebarComponent],
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
    fixture = TestBed.createComponent(ProfilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
