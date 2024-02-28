import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
// import {dat}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  nom_complet: string='';
  seletedUser: any = {};

  constructor(
    private authService: AuthService,
    private router : Router
    ){
  }
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    // const id = localStorage.getItem('userId');
    if (userString) {
      this.seletedUser=userString
       const user = JSON.parse(userString);
       this.nom_complet = user.nom_complet;
      //  this.email = user.email;
       console.log('le nom de l\'utilisateur', this.nom_complet);
      //  this.modifierUser(this.seletedUser)
      //  this.modifieUser(this.seletedUser)
  }
  }
  isUserLogApprenant(): boolean {
    return this.authService.isUserLogApprenant();
  }
  isUserLog(): boolean {
    return this.authService.isUserLoggedIn();
  }
  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }
  isUserLoggedInn(): boolean {
    return this.authService.isUserLoggedInn();
  }
  isUserLogged(): boolean {
    return this.authService.isUserLogged();
  }

    // Déconnexion de l'utisateur
    logout() {
      this.authService.logout();
      this.router.navigate(['/auth']); // Rediriger vers la page de connexion après la déconnexion
    }
}
