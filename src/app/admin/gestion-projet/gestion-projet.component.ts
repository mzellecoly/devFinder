import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet.model';
import { LangageService } from 'src/app/services/langage.service';
import { ProjetService } from 'src/app/services/projet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-projet',
  templateUrl: './gestion-projet.component.html',
  styleUrls: ['./gestion-projet.component.css'],
})
export class GestionProjetComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  // Les variables
  listeprojet: any[] = [];
  listeLangage: any[] = [];
  idProjet: number = 0;
  titre: string = '';
  description: string = '';
  nombre_de_participant: number = 0;
  langage_de_programmation: string = '';
  date_limite: string = '';
  statu: string = '';
  projetSelectionne: any = {};

  objToArray: any[] = [];

  constructor(
    private projetService: ProjetService,
    private langage: LangageService
  ) // private http : HttpClient,
  {}

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
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      },
    };
    this.getProjet();
    this.getLangage();
  }

  // Déclaration des variables
  isProgress: boolean = true;
  isTerminate: boolean = false;
  isCancel: boolean = false;

  // Déclaration des méthodes
  // Voir les projets urbaines
  showProgress() {
    this.isProgress = true;
    this.isTerminate = false;
    this.isCancel = false;
  }

  // Voir les projets de Terminate
  showTerminate() {
    this.isProgress = false;
    this.isTerminate = true;
    this.isCancel = false;
  }

  // Voir les projets Cancel
  showCancel() {
    this.isProgress = false;
    this.isTerminate = false;
    this.isCancel = true;
  }

  // Liste des Projets ajoutés
  getProjet(): void {
    this.projetService.getProjet().subscribe(
      (data: any) => {
        if ([data][0]['hydra:member'].length != 0) {
          this.listeprojet = [data][0]['hydra:member'];
          console.log(this.listeprojet);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des briefs', error);
      }
    );
  }

  // Ajoutez la méthode getLangageName
  getLangageName(langageUrl: string): string {
    const langage = this.listeLangage.find(
      (lang) => lang['@id'] === langageUrl
    );
    return langage ? langage.nom : 'Langage inconnu';
  }

  // Liste des langages de la base de données
  getLangage(): void {
    this.langage.getLangage().subscribe(
      (data: any) => {
        if ([data][0]['hydra:member'].length != 0) {
          this.listeLangage = [data][0]['hydra:member'];
          console.log('La liste des langages', this.listeLangage);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des langages', error);
      }
    );
  }

  viderChamps() {
    this.titre = '';
    this.description = '';
    this.nombre_de_participant = 0;
    this.date_limite = '';
  }
  // Ajout de projet
  // AjoutProjet() {
  //   if (this.titre == '') {
  //     this.projetService.showAlert('error', 'Attention', 'Renseigner un titre');
  //   } else if (this.description == '') {
  //     this.projetService.showAlert(
  //       'error',
  //       'Attention',
  //       'Renseigner une description'
  //     );
  //   } else if (this.nombre_de_participant == 0) {
  //     this.projetService.showAlert(
  //       'error',
  //       'Attention',
  //       'Renseigner le nombre de participant'
  //     );
  //   } else if (this.date_limite == '') {
  //     this.projetService.showAlert(
  //       'error',
  //       'Attention',
  //       'Renseigner un lien git'
  //     );
  //   } else {
  //     const newProjet: Projet = {
  //       titre: this.titre,
  //       description: this.description,
  //       langage_de_programmation: this.langage_de_programmation
  //         ? [this.langage_de_programmation]
  //         : [],
  //       nombre_de_participant: +this.nombre_de_participant,
  //       date_limite: this.date_limite,
  //     };
  //     console.log(
  //       'Après ajout :',
  //       this.langage_de_programmation
  //     );

  //     this.projetService.addProjet(newProjet).subscribe((reponse) => {
  //       console.log('Réponse du service :', reponse);

  //       this.projetService.showAlert(
  //         'success',
  //         'Bravo!',
  //         'Projet ajouté avec succés'
  //       );
  //       this.viderChamps();
  //       this.getProjet();
  //     });
  //   }
  // }

  AjoutProjet() {
    if (this.titre == '') {
      this.projetService.showAlert('error', 'Attention', 'Renseigner un titre');
    } else if (this.description == '') {
      this.projetService.showAlert('error', 'Attention', 'Renseigner une description');
    } else if (this.nombre_de_participant == 0) {
      this.projetService.showAlert('error', 'Attention', 'Renseigner le nombre de participant');
    } else if (this.date_limite == '') {
      this.projetService.showAlert('error', 'Attention', 'Renseigner une date limite');
    } else if (this.langage_de_programmation == '') {
      this.projetService.showAlert('error', 'Attention', 'Sélectionner un langage de programmation');
    } else {
      const newProjet: Projet = {
        titre: this.titre,
        description: this.description,
        langage_de_programmation: [this.langage_de_programmation], // Utilisez un tableau avec une seule chaîne
        nombre_de_participant: +this.nombre_de_participant,
        date_limite: this.date_limite,
      };
      this.projetService.addProjet(newProjet).subscribe((reponse) => {
        console.log('Réponse du service :', reponse);
        this.projetService.showAlert('success', 'Bravo!', 'Projet ajouté avec succès');
        this.viderChamps();
        this.getProjet();
      });
    }
  }
  
  // Supprimer projet
  getId(uri: any) {
    const idMatch = uri.match(/\/(\d+)$/);
    if (idMatch) {
      const id = idMatch[1];
      console.error("L'Id à mettre", id);
      return id;
    } else {
      console.log("Aucun ID trouvé dans l'URI");
    }
  }

  supprimerProjet(projet: any) {
    this.objToArray = Object.keys(projet).map((key) => {
      return { cle: key, valeur: projet[key] };
    });
    const id = this.getId(this.objToArray[0].valeur);
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière après cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F2A3D',
      cancelButtonColor: '#FFA439',
      confirmButtonText: 'Oui, supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          this.projetService.deleteProjet(id).subscribe(() => {
            this.projetService.showAlert(
              'success',
              'Supprimé!',
              'Projet supprimé avec succès'
            );
            this.getProjet();
          });
        } else {
          console.error('ID du projet est undefined');
        }
      }
    });
  }

  // Partie Modification Projet
  chargerInfosProjet(projet: any) {
    this.objToArray = Object.keys(projet).map((key) => {
      return { cle: key, valeur: projet[key] };
    });
    const id = this.getId(this.objToArray[0].valeur);
    this.idProjet = id;
    this.titre = projet.titre;
    this.description = projet.description;
    this.langage_de_programmation = projet.langage_de_programmation;
    this.date_limite = projet.date_limite;
    this.nombre_de_participant = projet.nombre_de_participant;
  }

  // fonction pour modifier Projet
  modifierProjet(id: any) {
    this.idProjet = id;
    const data = {
      titre: this.titre,
      description: this.description,
      langage_de_programmation: this.langage_de_programmation,
      nombre_de_participant: this.nombre_de_participant,
      date_limite: this.date_limite,
    };
    this.projetService.updateProjet(id, data).subscribe((response) => {});
    this.viderChamps();
    this.getProjet();
  }

  // Méthode pour afficher les détails du projet sélectionné
  afficherDetailsProjet(projet: Projet) {
    this.projetSelectionne = projet;
  }
}
