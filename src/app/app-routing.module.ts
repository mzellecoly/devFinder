import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ProjetComponent } from './projet/projet.component';
import { PolitiqueComponent } from './politique/politique.component';
import { ConditionComponent } from './condition/condition.component';
import { ProfilsComponent } from './profils/profils.component';
import { AccueilEntrepriseComponent } from './accueil-entreprise/accueil-entreprise.component';
const routes: Routes = [
  {path: '', redirectTo:'auth', pathMatch:'full'},
  {path: 'auth', component:AuthComponent},
  {path: 'accueil', component:AccueilComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'header', component:HeaderComponent},
  {path: 'footer', component:FooterComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'about', component:AboutComponent},
  {path: 'projet', component:ProjetComponent},
  {path: 'politique', component:PolitiqueComponent},
  {path: 'condition', component:ConditionComponent},
  {path: 'profils', component:ProfilsComponent},
  {path: 'accueilentreprise', component:AccueilEntrepriseComponent},
  {path: 'admin', loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
