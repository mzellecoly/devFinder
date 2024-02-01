import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DeveloppeurRoutingModule } from './developpeur-routing.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { GestionProjetComponent } from './gestion-projet/gestion-projet.component';
import { ProfilComponent } from './profil/profil.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { MaindevComponent } from './maindev/maindev.component';
import { AccueilDevComponent } from './accueil-dev/accueil-dev.component';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    GestionProjetComponent,
    ProfilComponent,
    MaindevComponent,
    AccueilDevComponent
  ],
  imports: [
    CommonModule,
    DeveloppeurRoutingModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class DeveloppeurModule { }
