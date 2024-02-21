import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  nom_complet: string='';
  constructor(
    private authService: AuthService,
    private router : Router
    ){
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
