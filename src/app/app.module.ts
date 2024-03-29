import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
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
import { AuthAssoComponent } from './auth-asso/auth-asso.component';
import { AuthEntrepriseComponent } from './auth-entreprise/auth-entreprise.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ArticleComponent } from './article/article.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { RouterModule } from '@angular/router';
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
    AuthAssoComponent,
    AuthEntrepriseComponent,
    MaintenanceComponent,
    ArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    EditorModule,
    RouterModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
