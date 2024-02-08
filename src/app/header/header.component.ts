import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router : Router
    ){
  }
  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
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
