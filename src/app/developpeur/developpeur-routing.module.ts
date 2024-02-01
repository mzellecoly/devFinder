import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaindevComponent } from './maindev/maindev.component';
import { AccueilDevComponent } from './accueil-dev/accueil-dev.component';
import { GestionProjetComponent } from './gestion-projet/gestion-projet.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: '', component:MaindevComponent, children:[
    {path: 'accueildev', component:AccueilDevComponent},
    {path: 'projet', component:GestionProjetComponent},
    {path: 'profil', component:ProfilComponent},
    {path: '', redirectTo:'accueildev', pathMatch:'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloppeurRoutingModule { }
