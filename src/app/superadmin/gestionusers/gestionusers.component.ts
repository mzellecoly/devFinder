import { Component } from '@angular/core';
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
  listeUsers: any[] = [];

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
    // this.getUsers();
    this.getUser();
  }

  // Déclaration des variables
  isProgress:boolean = true;
  isTerminate:boolean = false;
  isCancel:boolean = false;

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

  // Voir les projets Cancel
  showCancel(){
    this.isProgress = false;
    this.isTerminate = false;
    this.isCancel = true;
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
        // console.log(data);
        console.log('La liste est :', this.listeUsers);
    });
  }
  bloquerUtilisateur(id: number): void {
    // Affichez une fenêtre de confirmation avant de bloquer l'utilisateur
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière après cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#017D03',
      cancelButtonColor: '#FF9C00',
      confirmButtonText: 'Oui, bloquer!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, déterminez le nouvel état de blocage
        const newState = true;

        // Appelez la fonction bloquerUtilisateur avec les deux arguments requis
        this.user.bloquerUtilisateur(id, newState).subscribe(
          () => {
            // Mettez à jour la liste des utilisateurs après le blocage réussi
            this.getUser();
            // Affichez un message de succès
            Swal.fire(
              'Utilisateur bloqué!',
              "L'utilisateur a été bloqué avec succès.",
              'success'
            );
          },
          (error) => {
            // Affichez un message d'erreur s'il y a un problème lors du blocage
            Swal.fire(
              'Erreur!',
              "Une erreur est survenue lors du blocage de l'utilisateur.",
              'error'
            );
            console.error("Erreur lors du blocage de l'utilisateur :", error);
          }
        );
      }
    });
  }
  debloquerUtilisateur(id: number): void {
    Swal.fire({
      icon: 'success',
      title: 'Utilisateur débloqué!',
      text: "L'utilisateur a été débloqué avec succès.",
    });

    this.user.debloquerUtilisateur(id).subscribe(() => {
      this.getUser();
    });
  }
}
