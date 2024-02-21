import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { User } from '../models/user.modele';

@Component({
  selector: 'app-auth-asso',
  templateUrl: './auth-asso.component.html',
  styleUrls: ['./auth-asso.component.css'],
})
export class AuthAssoComponent {
  // Declarations des variables
  nom_complet: string = '';
  email: string = '';
  mot_de_passe: string = '';
  telephone: string = '';
  image: string = '';
  role: string = '';
  description: string = '';
  numero_identification_naitonal: string = '';
  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
  emailRegex =/^[A-Za-z]+[A-Za-z0-9._%+-]+@[A-Za-z][A-Za-z0-9.-]+.[A-Za-z]{3,}$/;
  formChoice = true;
  // Variables pour faire la vérifications
  verifNom: String = '';
  verifNinea: String = '';
  verifEmail: String = '';
  verifPassword: String = '';
  verifDescription: String = '';
  verifTelephone: String = '';
  // Variables si les champs sont exacts
  exactNom: boolean = false;
  exactEmail: boolean = false;
  exactPassword: boolean = false;
  exactTelephone: boolean = false;
  exactNinea: boolean = false;
  exactDescription: boolean = false;

  private isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/script.js';
    document.body.appendChild(script);
    if (this.email != '' && this.mot_de_passe != '') {
      this.login();
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
          localStorage.setItem('userOnline', JSON.stringify(response));
          localStorage.setItem(
            'access_token',
            JSON.stringify(response.token).replace(/['"]+/g, '')
          );
          // Gérer la réponse réussie du backend
          console.log(response);
          console.log('Role:', response.role);
          if (
            response.email === 'admin@admin.com' &&
            response.mot_de_passe === 'password'
          ) {
            this.router.navigate(['/superadmin']);
            this.alertMessage(
              'success',
              'Bienvenue',
              'Connexion réussie avec succès'
            );
          } else if (response.role == 'ROLE_APPRENANT') {
            this.router.navigate(['/developpeur']);
            this.alertMessage(
              'success',
              'Bienvenue',
              'Connexion réussie avec succès'
            );
          } else if (response.role == 'ROLE_ASSOCIATION') {
            this.router.navigate(['/admin']);
            this.alertMessage(
              'success',
              'Bienvenue',
              'Connexion réussie avec succès'
            );
          } else if (response.role == 'ROLE_ENTREPRISE') {
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
          this.alertMessage('error', 'Erreur', "Erreur d'authentification");
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
      showConfirmButton: false,
      timer: 900,
    });
  }

  // Déconnexion de l'utisateur
  logout() {
    this.authService.logout();
    this.router.navigate(['/authAssociation']);
  }

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  viderChamps() {
    this.nom_complet = '';
    this.email = '';
    this.mot_de_passe = '';
    this.telephone = '';
    this.image = '';
    this.description = '';
    this.numero_identification_naitonal = '';
    this.verifNom = '';
    this.verifNinea = '';
    this.verifEmail = '';
    this.verifPassword = '';
    this.verifDescription = '';
    this.verifTelephone = '';
    // Variables si les champs sont exacts
    this.exactNom = false;
    this.exactEmail = false;
    this.exactPassword = false;
    this.exactTelephone = false;
    this.exactNinea = false;
    this.exactDescription = false;
  }
  // Verification du nom
  verifNomFonction() {
    this.exactNom = false;
    if (this.nom_complet == '') {
      this.verifNom = 'Veuillez renseigner votre nom complet';
    } else if (this.nom_complet.length < 5) {
      this.verifNom = 'Le nom est trop court';
    } else {
      this.verifNom = '';
      this.exactNom = true;
    }
    // Si le champ est vide, efface le message d'erreur
    if (this.nom_complet == '') {
      this.verifNom = '';
    }
  }
  // Verification du nom
  verifDescriptionFonction() {
    this.exactDescription = false;
    if (this.description == '') {
      this.verifDescription = 'Veuillez renseigner une description';
    } else if (this.description.length < 5) {
      this.verifDescription = 'La description est trop courte';
    } else {
      this.verifDescription = '';
      this.exactDescription = true;
    }
    // Si le champ est vide, efface le message d'erreur
    if (this.description == '') {
      this.verifDescription = '';
    }
  }
  // Verification de  l'email
  verifEmailFonction() {
    this.exactEmail = false;

    if (this.email == '') {
      this.verifEmail = 'Veuillez renseigner votre email';
    } else if (!this.email.match(this.emailPattern)) {
      this.verifEmail = 'Veuillez donner un email valide';
    } else if (!this.email.match(this.emailRegex)) {
      this.verifEmail = 'Veuillez donner un email valide';
    } else if (!this.email.includes('.')) {
      this.verifEmail = 'Veuillez donner un email valide';
    } else {
      this.verifEmail = '';
      this.exactEmail = true;
    }
    // Si le champ est vide, efface le message d'erreur
    if (this.email == '') {
      this.verifEmail = '';
    }
  }
  // Verification du mot de passe
  verifPasswordFonction() {
    this.exactPassword = false;
    if (this.mot_de_passe == '') {
      this.verifPassword = 'Veuillez renseigner votre mot de passe';
    } else if (/\s/.test(this.mot_de_passe)) {
      this.verifPassword = "Mot de passe ne doit pas contenir d'espace";
    } else if (this.mot_de_passe.length < 10) {
      this.verifPassword =
        'Mot de passe doit être supérieur ou égal à 10 caratères';
    } else {
      this.verifPassword = '';
      this.exactPassword = true;
    }
    // Si le champ est vide, efface le message d'erreur
    if (this.mot_de_passe == '') {
      this.verifPassword = '';
    }
  }
  // Verification du numéro de téléphone
  verifTelephoneFonction() {
    this.exactTelephone = false;
    if (this.telephone == '') {
      this.verifTelephone = 'Veuillez renseigner votre numéro de téléphone';
    } else if (/\s/.test(this.telephone)) {
      this.verifTelephone =
        "Le numéro de téléphone ne doit pas contenir d'espace";
    } else if (!this.telephone.match(/^(\+221|221)?[76|77|78|70|33]\d{8}$/)) {
      this.verifTelephone = 'Le format du numéro de téléphone est invalide!';
    } else {
      this.verifTelephone = '';
      this.exactTelephone = true;
    }
    // Si le champ est vide, efface le message d'erreur
    if (this.telephone == '') {
      this.verifTelephone = '';
    }
  }
  // Verification du numéro de téléphone
  verifNineaFonction() {
    this.exactTelephone = false;
    if (this.numero_identification_naitonal == '') {
      this.verifNinea =
        'Veuillez renseigner votre numéro d4identification national';
    } else if (this.numero_identification_naitonal.length < 10) {
      this.verifNinea =
        "Le numéro d'identification national ne doit pas être inférieure à 10 carateres";
    } else {
      this.verifNinea = '';
      this.exactNinea = true;
    }
    // Si le champ est vide, efface le message d'erreur
    if (this.numero_identification_naitonal == '') {
      this.verifNinea = '';
    }
  }

  inscriptionUser() {
    this.verifNomFonction();
    this.verifEmailFonction();
    this.verifPasswordFonction();
    this.verifDescriptionFonction();
    this.verifTelephoneFonction();

    if (
      this.exactNom &&
      this.exactDescription &&
      this.exactEmail &&
      this.exactPassword &&
      this.exactDescription
    ) {
      let newUser: User = {
        nom_complet: this.nom_complet,
        telephone: this.telephone,
        email: this.email,
        mot_de_passe: this.mot_de_passe,
        description: this.description,
        numero_identification_naitonal: this.numero_identification_naitonal,
      };

      console.log(newUser);
      // Appel du service pour ajouter le nouvel utilisateur
      this.authService.inscriptionAssociation(newUser).subscribe(
        (addedUser) => {
          // L'utilisateur a été ajouté avec succès
          this.alertMessage(
            'success',
            'Super',
            'Inscription réussie avec succés!'
          );
          this.viderChamps();
          console.log('Utilisateur ajouté:', addedUser);
        },
        (error) => {
          // Gestion des erreurs lors de l'ajout de l'utilisateur
          console.error("Erreur lors de l'ajout de l'utilisateur:", error);
          this.alertMessage(
            'error',
            'Erreur',
            "Erreur lors de l'inscription. Veuillez réessayer."
          );
        }
      );
    }
  }

  ShowForm() {
    this.email = '';
    this.mot_de_passe = '';
    this.formChoice = !this.formChoice;
  }
}
