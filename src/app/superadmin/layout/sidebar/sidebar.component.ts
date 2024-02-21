import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.modele';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  userProfile: User | null = null;
  email: string='';
  mot_de_passe: string='';
  nom_complet: string='';
  roles: string='';
  seletedUser: any = {};

  constructor(
    private authService : AuthService,
    private router: Router
  ){}
    ngOnInit(): void {
      const userString = localStorage.getItem('userOnline');

      if (userString) {
       this.seletedUser=userString
        const user = JSON.parse(userString);
        this.nom_complet = user.nom_complet;
        this.email = user.email;
    }
  }

    // Déconnexion de l'utisateur
    logout() {
      this.authService.logout();
      this.router.navigate(['/auth']); // Rediriger vers la page de connexion après la déconnexion
    }

}
