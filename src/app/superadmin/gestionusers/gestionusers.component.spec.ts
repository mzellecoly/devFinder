import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionusersComponent } from './gestionusers.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('GestionusersComponent', () => {
  let component: GestionusersComponent;
  let fixture: ComponentFixture<GestionusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionusersComponent],
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
    fixture = TestBed.createComponent(GestionusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
