import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccueilEntrepriseComponent } from './accueil-entreprise/accueil-entreprise.component';
import { HeaderEntrepriseComponent } from './header-entreprise/header-entreprise.component';
import { FooterEntrepriseComponent } from './footer-entreprise/footer-entreprise.component';
import { ProjetComponent } from './projet/projet.component';
import { PolitiqueComponent } from './politique/politique.component';
import { ConditionComponent } from './condition/condition.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AccueilComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    AccueilEntrepriseComponent,
    HeaderEntrepriseComponent,
    FooterEntrepriseComponent,
    ProjetComponent,
    PolitiqueComponent,
    ConditionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
