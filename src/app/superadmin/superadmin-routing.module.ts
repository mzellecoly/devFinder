import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { GestionusersComponent } from './gestionusers/gestionusers.component';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { AccueilsuperadminComponent } from './accueilsuperadmin/accueilsuperadmin.component';
import { RessourceComponent } from './ressource/ressource.component';
import { GestionlangageComponent } from './gestionlangage/gestionlangage.component';

const routes: Routes = [
  {path: '', component:MainAdminComponent, children:[
    {path: 'accueilsuperadmin', component:AccueilsuperadminComponent},
    {path: 'user', component:GestionusersComponent},
    {path: 'profiladmin', component:ProfilAdminComponent},
    {path: 'ressource', component:RessourceComponent},
    {path: 'langage', component:GestionlangageComponent},
    {path: '', redirectTo:'accueilsuperadmin', pathMatch:'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
