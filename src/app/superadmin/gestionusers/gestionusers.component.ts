import { Component } from '@angular/core';
import { User } from 'src/app/models/user.modele';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionusers',
  templateUrl: './gestionusers.component.html',
  styleUrls: ['./gestionusers.component.css']
})
export class GestionusersComponent {
  dtOptions: DataTables.Settings = {};
  email: string = '';
  etat:boolean = false;
  listeUsers: any[] = [];
  userSelectionne: any ={};
  listeUsersBloque: any[] = [];

  constructor(
    private user : UtilisateurService
  ){}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/js/filter.js';
    document.body.appendChild(script);
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
    this.getUser();

    this.getUserBloque();
  }

  // Déclaration des variables
  isProgress:boolean = true;
  isTerminate:boolean = false;
  isCancel:boolean = false;
  // etat:boolean=true

  // Déclaration des méthodes
  // Voir les projets urbaines
  showProgress(){
    this.isProgress = true;
    this.isTerminate = false;
    this.isCancel = false;
  }

  // Voir les projets de Terminate
  showTerminate(){
    this.isProgress = false;
    this.isTerminate = true;
    this.isCancel = false;
  }


  // getUsers(): void {
  //   this.user.getUser().subscribe((data: any) => {

  //     if ([data][0]['hydra:member'].length != 0) {
  //       this.listeUsers = [data][0]['hydra:member'];
  //       console.log(this.listeUsers);
  //     }
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des utilisateur', error);
  //     }
  //   );
  // }

  getUser = () => {
    this.user.getUser().subscribe((data :any)=>{
        this.listeUsers = data.utilisateurs;
        console.log('La liste est :', this.listeUsers);
    });
  }
    // Méthode pour afficher les détails de l'utilisateur sélectionné
    afficherDetailsUser(user: User) {
      this.userSelectionne = user;
      console.log('la reponse est :', this.userSelectionne);
    }

    blockUser(userId: number) {
      const state = {
        etat: true
      }
      this.user.blockUser(userId,state).subscribe((resp) => {

          console.log(resp);

        Swal.fire('Utilisateur bloqué avec succès!', '', 'success');
        // Retirer l'utilisateur bloqué de la liste des utilisateurs actifs
        this.listeUsers = this.listeUsers.filter(user => user.id !== userId);
        // this.getUser(); // Actualiser la liste des utilisateurs après avoir bloqué un utilisateur
        this.getUserBloque();
      }, error => {
        console.error('Erreur lors du blocage de l\'utilisateur', error);
        Swal.fire('Erreur lors du blocage de l\'utilisateur', '', 'error');
      });
    }
    deblockUser(userId: number) {
      const state = {
        etat: false
      }
      this.user.blockUser(userId,state).subscribe((resp) => {

          console.log(resp);

        Swal.fire('Utilisateur débloqué avec succès!', '', 'success');
        // this.getUser(); // Actualiser la liste des utilisateurs après avoir bloqué un utilisateur
        this.getUserBloque();
      }, error => {
        console.error('Erreur lors du blocage de l\'utilisateur', error);
        Swal.fire('Erreur lors du blocage de l\'utilisateur', '', 'error');
      });
    }

    getUserBloque(){
      // alert('gkfdf')
      this.user.getUserBan().subscribe((data :any)=>{
        // console.log("dfdjfhddfdfjd");

          this.listeUsersBloque = data.utilisateursBloque;
          // console.log(data);
          console.log('La liste des bloqué :', this.listeUsersBloque);
      });
    }
}
