import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  // Declarations des variables
  nom_complet: string = '';
  email: string = '';
  mot_de_passe: string = '';
  telephone: string = '';
  image: string = '';
  role: string = '';
  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

  private isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/script.js';
    document.body.appendChild(script);
    if(this.email !='' && this.mot_de_passe !=''){
      this.login();
    }
  }

  // Methode pour s'inscrire
  inscription() {
    if (this.nom_complet == '') {
      this.alertMessage('error', 'Attention', 'Merci de renseigner votre nom!');
    } else if (this.email == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner votre email!'
      );
    } else if (!this.email.match(this.emailPattern)) {
      this.alertMessage(
        'error',
        'Attention',
        'Veuillez renseigner une adresse email invalide!'
      );
    } else if (this.mot_de_passe == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner le mot de passe!'
      );
    } else if (this.mot_de_passe.length < 8) {
      this.alertMessage(
        'error',
        'Attention',
        'le mot de ppasse doit etre supérieur ou égal à 8!'
      );
    } else if (this.role == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner votre role!'
      );
    } else if (this.image == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner image de profil!'
      );
    } else {
  }
}
  // Methode pour faire la connexion
  login() {
    if (this.email == '') {
      this.alertMessage('error', 'Attention', "Renseigner l'email");
        } else if (this.mot_de_passe == '') {
           this.alertMessage('error', 'Attention', 'Renseigner le mot de passe');
       } else {
      // Envoyer les informations d'identification au backend via une API
      this.authService.login(this.email, this.mot_de_passe).subscribe(
        (response) => {
          // Gérer la réponse réussie du backend
          console.log(response);
          console.log('Role:', response.role);
          if (response.email === 'admin@admin.com' && response.mot_de_passe==="password") {
            this.router.navigate(['/superadmin']);
            this.alertMessage(
              'success',
              'Bienvenue',
              'Connexion réussie avec succès'
            );
          } else if (response.role == "ROLE_APPRENANT") {
            this.router.navigate(['/developpeur']);
            this.alertMessage(
              'success',
              'Bienvenue',
              'Connexion réussie avec succès'
              );
          } else if (response.role ==  "ROLE_ASSOCIATION") {
            this.router.navigate(['/admin']);
            this.alertMessage(
              'success',
              'Bienvenue',
              'Connexion réussie avec succès'
            );
          } else if(response.role ==  "ROLE_ENTREPRISE"){
            this.router.navigate(['/accueil']);
            this.alertMessage(
              'success',
              'Bienvenue',
              'Connexion réussie avec succès'
            );
          }
        },
        (error) => {
          // Gérer l'échec de l'authentification
          console.log("Erreur d'authentification:", error);
          this.alertMessage(
            'error',
            'Erreur',
            'Erreur d\'authentification'
          );
        }
      );
    }
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }


  // Fonction pour afficher un sweetalert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
