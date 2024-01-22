import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { DeveloppeurComponent } from './developpeur/developpeur.component';
import { ProfilComponent } from './profil/profil.component';
import { GestionProjetComponent } from './gestion-projet/gestion-projet.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  {path: '', component:MainComponent, children:[
    {path: 'accueiladmin', component:AccueilAdminComponent},
    {path: 'developpeur', component:DeveloppeurComponent},
    {path: 'profil', component:ProfilComponent},
    {path: 'gestionprojet', component:GestionProjetComponent},
    {path: 'table', component:TablesComponent},
    {path: '', redirectTo:'dashboard', pathMatch:'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
