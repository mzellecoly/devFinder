import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.modele';
import { AuthService } from 'src/app/services/auth.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
  userProfile: User | null = null;
  email: string='';
  mot_de_passe: string='';
  nom_complet: string='';
  roles: string='';
  idUser: number = 0;
  // seletedUser: any = {};

  constructor(
    private authService: AuthService,
    private user : UtilisateurService
    ) {}

 seletedUser: any = {};


  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/profil.js';
    document.body.appendChild(script);

    const userString = localStorage.getItem('user');
    const id = localStorage.getItem('userId');
    if (userString) {
      this.seletedUser=userString
       const user = JSON.parse(userString);
       this.nom_complet = user.nom_complet;
       this.email = user.email;
       console.log('l\'id de l\'utilisateur', id);
       this.modifierUser(this.seletedUser)
      //  this.modifieUser(this.seletedUser)
  }
}

modifierUser(id: any) {
  id = localStorage.getItem('userId');
  const data = {
    nom_complet: this.nom_complet,
    email: this.email,
  };

  this.user.updateAsso(this.seletedUser, data).subscribe(
    (response) => {
      console.log('Update response:', response);
      // Vous pouvez gérer la réponse du backend ici, par exemple, afficher un message de succès
    },
    (error) => {
      console.error('Update error:', error);
      // Vous pouvez gérer l'erreur ici, par exemple, afficher un message d'erreur
    }
  );
}
modifieUser(id: any){
   id = localStorage.getItem('userId');
  const data = {
    nom_complet: this.nom_complet,
    email: this.email,
  };
     // Appelez la mise à jour du projet dans le service
     this.user.updateAsso(id, data).subscribe((response) => {
      // Une fois la mise à jour terminée, récupérez les projets mis à jour
     },
    (error) => {
      console.error('Update error:', error);
      // Vous pouvez gérer l'erreur ici, par exemple, afficher un message d'erreur
    }
  );
}
}
