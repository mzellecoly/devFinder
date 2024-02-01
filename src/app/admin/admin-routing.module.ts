import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { ProfilComponent } from './profil/profil.component';
import { GestionProjetComponent } from './gestion-projet/gestion-projet.component';
import { EditprofilComponent } from './editprofil/editprofil.component';
import { GestionlangageComponent } from './gestionlangage/gestionlangage.component';

const routes: Routes = [
  {path: '', component:MainComponent, children:[
    {path: 'accueiladmin', component:AccueilAdminComponent},
    {path: 'gestionprojet', component:GestionProjetComponent},
    {path: 'editprofil', component:EditprofilComponent},
    {path: 'profil', component:ProfilComponent},
    {path: 'langage', component:GestionlangageComponent},
    {path: '', redirectTo:'accueiladmin', pathMatch:'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
