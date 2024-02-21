import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { ProfilComponent } from './profil/profil.component';
import { GestionProjetComponent } from './gestion-projet/gestion-projet.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { EditprofilComponent } from './editprofil/editprofil.component';
import { GestionlangageComponent } from './gestionlangage/gestionlangage.component';
import { SharedModule } from '../shared/shared.module';
import { LangageProgramPipe } from '../shared/langage-program.pipe';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    HeaderComponent,
    AccueilAdminComponent,
    ProfilComponent,
    GestionProjetComponent,
    EditprofilComponent,
    GestionlangageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    EditorModule
  ],
  providers: [
    DatePipe,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
})
export class AdminModule {}
