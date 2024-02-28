import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionlangageComponent } from './gestionlangage.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('GestionlangageComponent', () => {
  let component: GestionlangageComponent;
  let fixture: ComponentFixture<GestionlangageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionlangageComponent],
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
    fixture = TestBed.createComponent(GestionlangageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
