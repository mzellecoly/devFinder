import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { GestionusersComponent } from './gestionusers/gestionusers.component';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RessourceComponent } from './ressource/ressource.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    GestionusersComponent,
    MainAdminComponent,
    ProfilAdminComponent,
    RessourceComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class SuperadminModule { }
