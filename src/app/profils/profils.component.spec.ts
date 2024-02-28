import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilsComponent } from './profils.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

describe('ProfilsComponent', () => {
  let component: ProfilsComponent;
  let fixture: ComponentFixture<ProfilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilsComponent,
        FooterComponent,
        HeaderComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        DataTablesModule,
        HttpClientModule,
        EditorModule,
        RouterModule,
      ],
    });
    fixture = TestBed.createComponent(ProfilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
