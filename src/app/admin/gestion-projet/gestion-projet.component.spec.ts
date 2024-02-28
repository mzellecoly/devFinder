import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProjetComponent } from './gestion-projet.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('GestionProjetComponent', () => {
  let component: GestionProjetComponent;
  let fixture: ComponentFixture<GestionProjetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionProjetComponent],
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
    fixture = TestBed.createComponent(GestionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
