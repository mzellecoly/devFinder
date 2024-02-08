import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProjetComponent } from './projet/projet.component';
import { PolitiqueComponent } from './politique/politique.component';
import { ConditionComponent } from './condition/condition.component';
import { DataTablesModule } from 'angular-datatables';
import { ProfilsComponent } from './profils/profils.component';
import { AccueilEntrepriseComponent } from './accueil-entreprise/accueil-entreprise.component';
import { AccueilsuperadminComponent } from './superadmin/accueilsuperadmin/accueilsuperadmin.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { ProfilRecrueComponent } from './profil-recrue/profil-recrue.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AccueilComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    ProjetComponent,
    PolitiqueComponent,
    ConditionComponent,
    ProfilsComponent,
    AccueilEntrepriseComponent,
    AccueilsuperadminComponent,
    EditProfilComponent,
    ProfilRecrueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
