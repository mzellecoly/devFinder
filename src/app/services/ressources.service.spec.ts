import { TestBed } from '@angular/core/testing';

import { RessourcesService } from './ressources.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from '../app-routing.module';

describe('RessourcesService', () => {
  let service: RessourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    service = TestBed.inject(RessourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
