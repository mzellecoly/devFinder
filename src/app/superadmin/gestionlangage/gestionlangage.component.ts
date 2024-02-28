import { Component, OnInit } from '@angular/core';
import { Langage } from 'src/app/models/langage.model';
import { LangageService } from 'src/app/services/langage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionlangage',
  templateUrl: './gestionlangage.component.html',
  styleUrls: ['./gestionlangage.component.css'],
})
export class GestionlangageComponent implements OnInit {
  nom: string = '';
  listeCompetence: any[] = [];
  objToArray: any[] = [];

  constructor(private competence: LangageService) {}

  ngOnInit(): void {
    this.getCompetence();
  }
  // Liste des compétences ajoutés
  getCompetence(): void {
    this.competence.getCompetences().subscribe(
      (data: any) => {
        if ([data][0]['hydra:member'].length != 0) {
          this.listeCompetence = [data][0]['hydra:member'];
          console.log('Les compétences', this.listeCompetence);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des competences', error);
      }
    );
  }

  // Méthode pour vider les champs du formulaire
  viderChamps() {
    this.nom = '';
  }

  // Méthode pour ajouter un competence
  ajoutLangage() {
    if (this.nom == '') {
      this.competence.showAlert('Attention', 'Renseigner un nom', 'error');
    } else {
      console.log('Avant ajout :', this.nom);
      const newLangage: Langage = {
        nom: this.nom,
      };
      console.log('Après ajout :', this.nom);
      this.competence.addCompetence(newLangage).subscribe((reponse) => {
        console.log('Réponse du service :', reponse);
        this.competence.showAlert(
          'Bravo!',
          'Langage ajouté avec succés',
          'success'
        );
        this.viderChamps();
        this.getCompetence();
      });
    }
  }

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

  supprimerLangage(competence: any) {
    this.objToArray = Object.keys(competence).map((key) => {
      return { cle: key, valeur: competence[key] };
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
          this.competence.deleteCompetence(id).subscribe(() => {
            this.competence.showAlert(
              'Supprimé!',
              'Compétence supprimé avec succès',
              'success'
            );
            this.getCompetence();
          });
        } else {
          console.error('ID du compétence est undefined');
        }
      }
    });
  }
}
