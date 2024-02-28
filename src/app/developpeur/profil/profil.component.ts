import { Component, OnInit } from '@angular/core';
import { Competence } from 'src/app/models/competence.model';
import { Langage } from 'src/app/models/langage.model';
import { ApprenantService } from 'src/app/services/apprenant.service';
import { AuthService } from 'src/app/services/auth.service';
import { LangageService } from 'src/app/services/langage.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  User: any[] = [];
  email: string = '';
  mot_de_passe: string = '';
  nom_complet: string = '';
  nom: string = '';
  telephone: string = '';
  description: string = '';
  descriptionCOM: string = '';
  seletedUser: any = {};
  listeCompetence: any[] = [];
  listeDescrip: any[] = [];
  listeDescripCompetence: any[] = [];
  competences: string = '';
  competence: string = '';
  descriptionCom: string = '';
  lien_de_realisation: string = '';
  competenceSelectionnee: Competence | undefined;
  idDescr: number = 0;
  idUser: string = '';

  constructor(
    private authService: AuthService,
    private user: UtilisateurService,
    private Competence: LangageService,
    private apprenant: ApprenantService
  ) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');

    if (userString) {
      // this.seletedUser=userString
      const user = JSON.parse(userString);
      this.nom_complet = user.nom_complet;
      this.email = user.email;
      this.telephone = user.telephone;
      this.description = user.description;
      // console.log('infos de user', user);
    }
    this.getUser();
    this.getCompetence();
    // this.getDescripCompetence();
  }

  // Récuperer les infos de l\'utilisateur
  // getUser() {
  //   this.idUser = localStorage.getItem('userId') ?? '';
  //   this.apprenant.getApprenant(this.idUser).subscribe(
  //     (data: any) => {
  //       // console.warn(data);
  //       this.listeDescrip = data;
  //       this.listeDescripCompetence = data.descriptionCompetences;
  //       console.warn('id:', this.idUser);
  //       console.log("Informations:",this.listeDescrip);
  //       this.listeDescripCompetence.forEach((descriptionCompetence) => {
  //         const id = this.getId(descriptionCompetence.competence);
  //         const nomCompetence = this.getCompetenceById(id);
  //         descriptionCompetence['nomCompetence'] = nomCompetence;
  //         console.error('Nom de la compétence:', nomCompetence);
  //       });
  //     },
  //     (error) => {
  //       console.error(
  //         "Erreur lors de la récupération des informations de l'utilisateur :",
  //         error
  //       );
  //     }
  //   );
  // }
  getUser() {
    this.idUser = localStorage.getItem('userId') ?? '';
    this.apprenant.getApprenant(this.idUser).subscribe(
      (data: any) => {
        // console.warn(data);
        this.listeDescrip = data;
        this.listeDescripCompetence = data.descriptionCompetences;
        console.warn('id:', this.idUser);
        console.log("Informations:",this.listeDescrip);
        this.listeDescripCompetence.forEach((descriptionCompetence) => {
          const id = this.getId(descriptionCompetence.competence);
          const nomCompetence = this.getCompetenceById(id);
          descriptionCompetence['nomCompetence'] = nomCompetence;
          console.error('Nom de la compétence:', nomCompetence);
        });
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          error
        );
      }
    );
  }

  // Liste des compétence de la base de données
  getCompetence(): void {
    this.Competence.getCompetences().subscribe(
      (data: any) => {
        if ([data][0]['hydra:member'].length != 0) {
          this.listeCompetence = [data][0]['hydra:member'];
          // console.log('La liste des compétences', this.listeCompetence);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des compétences', error);
      }
    );
  }
  getId(uri: any) {
    const idMatch = uri.match(/\/(\d+)$/);
    console.error(idMatch);
    if (idMatch) {
      const id = idMatch[1];
      console.error("L'Id à mettre", id);
      return id;
    } else {
      console.log("Aucun ID trouvé dans l'URI");
    }
  }
  getDescripCompetence(): void {
    this.apprenant.getDescripCompetence().subscribe(
      (data: any) => {
        if ([data][0]['hydra:member'].length != 0) {
          this.listeDescripCompetence = [data][0]['hydra:member'];
          console.log('La liste des descriptions', this.listeDescripCompetence);
          this.listeDescripCompetence.forEach((descriptionCompetence) => {
            const id = this.getId(descriptionCompetence.competence);
            const nomCompetence = this.getCompetenceById(id);
            descriptionCompetence['nomCompetence'] = nomCompetence;
            console.log('Nom de la compétence:', nomCompetence);
          });
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des descriptions', error);
      }
    );
  }
  getCompetenceById(id: number): string {
    const competenceTrouvee = this.listeCompetence.find(
      (competence) => this.getId(competence['@id']) === id.toString()
    );
    if (competenceTrouvee) {
      return competenceTrouvee['nom'];
    } else {
      return 'Compétence non trouvée';
    }
  }
  // Méthode pour vider les champs du formulaire
  viderChamps() {
    this.nom = '';
    this.description = '';
    this.descriptionCom = '';
    this.competences = '';
    this.lien_de_realisation = '';
  }

  // Méthode pour ajouter un langage
  ajoutCompetence() {
    if (this.competences == '') {
      this.Competence.showAlert(
        'Attention',
        'Renseigner une competence',
        'error'
      );
    } else if (this.description == '') {
      this.Competence.showAlert(
        'Attention',
        'Renseigner une description a la compétence',
        'error'
      );
    } else if (this.lien_de_realisation == '') {
      this.Competence.showAlert(
        'Attention',
        'Renseigner un lien de realisation',
        'error'
      );
    } else {
      console.log('Avant ajout :', this.nom);
      const uri = '/api/competence/';
      const id = this.competences;
      const path = uri + id;
      const newCompetence: Competence = {
        competence: path,
        description: this.descriptionCom,
        lien_de_realisation: this.lien_de_realisation,
      };
      console.warn('Après ajout :', path);
      this.Competence.addCompetenceApprenant(newCompetence).subscribe(
        (reponse) => {
          console.log('Réponse du service :', reponse);
          this.Competence.showAlert(
            'Bravo!',
            'Description ajouté avec succés',
            'success'
          );
          this.viderChamps();
          // this.getCompetence();
          this.getUser();
        }
      );
    }
  }
  objToArray: any[] = [];
  supprimerDescripCompetence(description: any) {
    this.objToArray = Object.keys(description).map((key) => {
      return { cle: key, valeur: description[key] };
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
          this.apprenant.deleteDescripCompetence(id).subscribe(() => {
            this.apprenant.showAlert(
              'Supprimé!',
              'Description supprimé avec succès',
              'success'
            );
            // this.getDescripCompetence();
            this.getUser();
          });
        } else {
          console.error('ID de la description est undefined');
        }
      }
    });
  }
  supprimerDescripCompetences(id:number) {
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
          this.apprenant.deleteDescripCompetence(id).subscribe(() => {
            this.apprenant.showAlert(
              'Supprimé!',
              'Description supprimé avec succès',
              'success'
            );
            // this.getDescripCompetence();
            this.getUser();
          });
        } else {
          console.error('ID de la description est undefined');
        }
      }
    });
  }
  // Partie Modification Immersion
  chargerInfosDescription(description: any) {
    this.objToArray = Object.keys(description).map((key) => {
      return { cle: key, valeur: description[key] };
    });
    const id = this.getId(this.objToArray[0].valeur);
    this.idDescr = id;
    this.description = description.description;
    this.lien_de_realisation = description.lien_de_realisation;
    console.log('description', description);
  }

  // fonction pour modifier Immersion
  modifierDescripCompetence(id: any) {
    this.idDescr = id;
    const data = {
      description: this.description,
      lien_de_realisation: this.lien_de_realisation,
    };
    this.apprenant
      .updateDescripCompetence(id, data)
      .subscribe((response) => {});
    this.apprenant.showAlert(
      'Bravo!',
      'Immersion modifié avec succés',
      'success'
    );
    this.viderChamps();
    this.getUser();
    // this.getDescripCompetence();
    Swal.close();
  }
}
