import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { DeveloppeurComponent } from './developpeur/developpeur.component';
import { ProfilComponent } from './profil/profil.component';
import { GestionProjetComponent } from './gestion-projet/gestion-projet.component';
import { TablesComponent } from './tables/tables.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    HeaderComponent,
    AccueilAdminComponent,
    DeveloppeurComponent,
    ProfilComponent,
    GestionProjetComponent,
    TablesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule,
    FormsModule
  ]
})
export class AdminModule { }
