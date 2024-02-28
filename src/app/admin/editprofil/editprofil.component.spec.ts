import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofilComponent } from './editprofil.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('EditprofilComponent', () => {
  let component: EditprofilComponent;
  let fixture: ComponentFixture<EditprofilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditprofilComponent],
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
    fixture = TestBed.createComponent(EditprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
