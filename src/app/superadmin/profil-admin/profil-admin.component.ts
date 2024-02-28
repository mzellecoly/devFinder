import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.modele';
import { AuthService } from 'src/app/services/auth.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent implements OnInit{

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
   const userString = localStorage.getItem('user');

 if (userString) {
  // this.seletedUser=userString
   const user = JSON.parse(userString);
   this.nom_complet = user.nom_complet;
   this.email = user.email;
   this.modifierUser(this.idUser)

 }
// const userString = localStorage.getItem('userOnline');

 }


 modifierUser(id: any) {
  this.idUser=id
   const data = {
     nom_complet: this.nom_complet,
     email: this.email,
   };

   console.log('Selected user:', id);

   // Assurez-vous que votre service updateUser fonctionne correctement
   this.user.updateUser(this.seletedUser, data).subscribe(
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


}
