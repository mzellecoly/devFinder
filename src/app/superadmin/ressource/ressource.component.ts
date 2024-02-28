import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { toArray } from 'rxjs';
import { Brief } from 'src/app/models/brief.model';
import { Imerssion } from 'src/app/models/immersion.model';
import { RessourcesService } from 'src/app/services/ressources.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css'],
})
export class RessourceComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  listeBrief: any[] = [];
  listeImerssion: any[] = [];
  idBrief: number = 0;
  idImmersion: number = 0;
  titre: string = '';
  // description: string = '';
  niveau_de_competence: string = '';
  lien_support: string = '';
  lient_support: string = '';
  // lien_du_livrable: string = '';
  cahierDecharge: any;
  objToArray: any[] = [];
  briefSelectionne: any = {};
  imerssionSelectionne: any = {};

  // Variables pour faire la vérifications
  verifTitre: String = '';
  verifNiveau: String = '';
  verifCahierdeCharge: String = '';
  verifLiensupport: String = '';
  // Variables si les champs sont exacts
  exactTitre: boolean = false;
  exactDescription: boolean = false;
  exactCahierdeCharge: boolean = false;
  exactLiensupport: boolean = false;
  exactNiveau: boolean = false;
 public pdfUpload:any; // test
  // exactTelephone: boolean = false;
  // exactNinea: boolean = false;

  // Méthode pour afficher les détails du brief sélectionné
  afficherDetailsBrief(brief: Brief) {
    this.briefSelectionne = brief;
  }
  // Méthode pour afficher les détails de l'imerssion sélectionné
  afficherDetailsImerssion(brief: Brief) {
    this.briefSelectionne = brief;
  }

  projet1 = {
    titre: '',
    description: '',
  };
  // Ajoutez ces deux propriétés
  partieDuTexte: string | undefined;
  texteComplet: string | undefined;

  constructor(
    private ressourceService: RessourcesService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

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
    this.texteComplet = this.projet1.description;
    this.partieDuTexte = this.getPartieDuTexte(this.texteComplet, 50);
    this.getBrief();
    // this.getBrief1();
    this.getImerssion1();
    this.getImerssion();
  }

  // Déclaration des variables pour le filtre
  isProgress: boolean = true;
  isTerminate: boolean = false;
  isCancel: boolean = false;

  // Déclaration des méthodes pour le filtre

  // Voir les projets urbaines pour le filtre
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
  // Méthode pour afficher une partie du texte sur le tableau et tout le texte au niveau des détails
  getPartieDuTexte(texte: string, longueurMax: number): string {
    if (texte.length <= longueurMax) {
      return texte;
    } else {
      return texte.substring(0, longueurMax) + '...';
    }
  }
  updatePartieDuTexte(texteComplet: string) {
    this.partieDuTexte = this.getPartieDuTexte(texteComplet, 20);
  }

  // Liste des briefs ajoutés
  getBrief(): void {
    this.ressourceService.getBrief().subscribe(
      (data: any) => {
        if ([data][0]['hydra:member'].length != 0) {
          this.listeBrief = [data][0]['hydra:member'];
          console.log('la liste des briefs', this.listeBrief);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des briefs', error);
      }
    );
  }
  getBrief1(): void {
    this.ressourceService.getBrief().subscribe((data: any) => {
      this.listeBrief = data;
      console.log('les briefs sont là :', this.listeBrief);
    });
  }

  // Liste des imerssions ajoutés
  getImerssion(): void {
    this.ressourceService.getImerssion().subscribe(
      (data: any) => {
        if ([data][0]['hydra:member'].length != 0) {
          this.listeImerssion = [data][0]['hydra:member'];
          console.log('La liste des immersion est:', this.listeImerssion);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des imerssions', error);
      }
    );
  }
  getImerssion1(): void {
    this.ressourceService.getImerssion().subscribe((data: any) => {
      this.listeImerssion = data;
      console.log('les immersions sont là :', this.listeImerssion);
    });
  }
  viderChamps() {
    this.titre = '';
    this.pdfUpload = '';
    this.lien_support = '';
    this.cahierDecharge = '';
    this.lient_support = '';
    this.niveau_de_competence = '';
  }

  // Verification du titre
  verifTitreFonction() {
    this.exactTitre = false;
    if (this.titre == '') {
      this.verifTitre = 'Veuillez renseigner titre';
    } else if (this.titre.length < 5) {
      this.verifTitre = 'Le titre est trop court';
    } else {
      this.verifTitre = '';
      this.exactTitre = true;
    }
    // Si le champ est vide, efface le message d'erreur
    if (this.titre == '') {
      this.verifTitre = '';
    }
  }
  // Verification du cahier de charge
  verifCahierdeChargeFonction() {
    this.exactCahierdeCharge = false;

    if (this.cahierDecharge == '') {
      this.verifCahierdeCharge = 'Veuillez renseigner votre cahierDecharge';
    } else {
      this.verifCahierdeCharge = '';
      this.exactCahierdeCharge = true;
    }
    // Si le champ est vide, efface le message d'erreur
    if (this.cahierDecharge == '') {
      this.verifCahierdeCharge = '';
    }
  }
  // Verification du niveau de compétence
  verifNiveauFonction() {
    this.exactNiveau = false;
    if (this.niveau_de_competence == '') {
      this.verifNiveau = 'Veuillez renseigner un niveau de compétence';
    } else {
      this.verifNiveau = '';
      this.exactNiveau = true;
    }
    // Si le champ est vide, efface le message d'erreur
    if (this.niveau_de_competence == '') {
      this.verifNiveau = '';
    }
  }
  // Verification du lien de support
  verifLienFonction() {
    this.exactLiensupport = false;
    if (this.lien_support == '') {
      this.verifLiensupport = 'Veuillez renseigner un lien';
    } else {
      this.verifLiensupport = '';
      this.exactLiensupport = true;
    }
    // Si le champ est vide, efface le message d'erreur
    if (this.lien_support == '') {
      this.verifLiensupport = '';
    }
  }
  // Ajout des immersion
  AjoutImmersion() {
    this.verifTitreFonction();
    this.verifCahierdeChargeFonction();
    this.verifLienFonction();
    this.verifNiveauFonction();
    if (this.titre == '') {
      this.showAlert('Erreur!', 'Veuillez remplir les champs', 'error');
    } else{
      let formData = new FormData();
      formData.append('titre', this.titre);
      formData.append('cahierDeCharge', this.pdfUpload);
      // if (this.cahierDecharge) {
      // }
      formData.append('lien_support', this.lien_support);
      console.log('le formdata est', formData);
      // let test={
      //   titre:this.titre,
      //   cahierDeCharge:this.pdfUpload,
      //   lien_support:this.lien_support,
      // }
      // alert(formData.get('titre'));
      // alert(formData.get('cahierDecharge'));
      console.warn(formData);
      this.ressourceService.ajoutImmersion(formData).subscribe((reponse) => {
        console.log('le formdata est', formData);
        console.log('Réponse du service :', reponse);
        this.ressourceService.showAlert(
          'Bravo!',
          'Imerssion ajouté avec succéBravo!',
          'success'
        );
        this.viderChamps();
        this.getImerssion1();
        this.getImerssion();
        Swal.close();
      }
      ,
      (error) => {
        console.error('Erreur lors de l\'ajout du projet :', error);
        // Gestion des erreurs ici
        if (error.status === 400) {
          // Erreur de validation du formulaire
          const errorMessages = error.error['hydra:description'];
          if (Array.isArray(errorMessages)) {
            // Si le message d'erreur est un tableau, vous pouvez le parcourir pour l'afficher
            errorMessages.forEach(errorMessage => {
              this.ressourceService.showAlert('Erreur !!', errorMessage, 'error');
            });
          } else {
            // Sinon, affichez le message d'erreur directement
            this.ressourceService.showAlert('Erreur !!', errorMessages, 'error');
          }
        } else {
          // Gestion des autres types d'erreurs
          this.ressourceService.showAlert('Erreur !!', 'Une erreur s\'est produite lors de l\'ajout du projet.', 'error');
        }
      });
    }
    // else {
    //   console.log(this.titre, this.exactLiensupport, this.exactCahierdeCharge);
    // }
  }
  AjoutBrief() {
    this.verifTitreFonction();
    this.verifCahierdeChargeFonction();
    this.verifLienFonction();
    this.verifNiveauFonction();
    if (this.titre == '') {
      this.showAlert('Erreur!', 'Veuillez remplir les champs', 'error');
    } else{
      let formData = new FormData();
      formData.append('titre', this.titre);
      formData.append('cahierDeCharge', this.pdfUpload);
      // if (this.cahierDecharge) {
      // }
      formData.append('lient_support', this.lient_support);
      formData.append('niveau_de_competence', this.niveau_de_competence);
      console.log('le formdata est', formData);
      // let test={
      //   titre:this.titre,
      //   cahierDeCharge:this.pdfUpload,
      //   lien_support:this.lien_support,
      // }
      // alert(formData.get('titre'));
      // alert(formData.get('cahierDecharge'));
      console.warn(formData);
      this.ressourceService.ajoutBrief(formData).subscribe((reponse) => {
        console.log('le formdata est', formData);
        console.log('Réponse du service :', reponse);
        this.ressourceService.showAlert(
          'Bravo!',
          'Brief ajouté avec succéBravo!',
          'success'
        );
        this.viderChamps();
        this.getBrief();
        Swal.close();
      }
      ,
      (error) => {
        console.error('Erreur lors de l\'ajout du projet :', error);
        // Gestion des erreurs ici
        if (error.status === 400) {
          // Erreur de validation du formulaire
          const errorMessages = error.error['hydra:description'];
          if (Array.isArray(errorMessages)) {
            // Si le message d'erreur est un tableau, vous pouvez le parcourir pour l'afficher
            errorMessages.forEach(errorMessage => {
              this.ressourceService.showAlert('Erreur !!', errorMessage, 'error');
            });
          } else {
            // Sinon, affichez le message d'erreur directement
            this.ressourceService.showAlert('Erreur !!', errorMessages, 'error');
          }
        } else {
          // Gestion des autres types d'erreurs
          this.ressourceService.showAlert('Erreur !!', 'Une erreur s\'est produite lors de l\'ajout du projet.', 'error');
        }
      });
    }
    // else {
    //   console.log(this.titre, this.exactLiensupport, this.exactCahierdeCharge);
    // }
  }
  // ------------------methode pour charger le champ input ---------
  // getFile(event: any) {
  //   this.cahierDecharge = event.target.files[0] as File;
  //   console.warn(this.cahierDecharge);
  // }
  getFile(event: any) {
    const file = event.target.files[0] as File;
    // this.cahierDecharge = file;
    this.pdfUpload=file;
      console.warn("Le cahier de charge :",this.pdfUpload); // Vérifiez l'objet fichier dans la console
    // if (file) {
    //   this.cahierDecharge = file;
    //   console.warn("Le cahier de charge :",this.cahierDecharge); // Vérifiez l'objet fichier dans la console
    // }
  }


  // Ajout des briefs
  // AjoutBrief() {
  //   this.verifTitreFonction();
  //   this.verifCahierdeChargeFonction();
  //   this.verifLienFonction();
  //   this.verifNiveauFonction();
  //   if (this.titre == '') {
  //     this.showAlert('Erreur!', 'Veuillez remplir les champs', 'error');
  //   } else {
  //     // console.log('Avant ajout :', this.titre, this.description, this.lient_support, this.niveau_de_competence);
  //     const newBrief: Brief = {
  //       titre: this.titre,
  //       description: this.cahierDecharge,
  //       niveau_de_competence: this.niveau_de_competence,
  //       lient_support: this.lient_support,
  //     };
  //     // console.log('Après ajout brief:', this.titre, this.description, this.niveau_de_competence, this.lient_support);
  //     this.ressourceService.ajoutBrief(newBrief).subscribe((reponse) => {
  //       console.log('Réponse du service :', reponse);
  //       this.ressourceService.showAlert(
  //         'Bravo!',
  //         'Brief ajouté avec succés',
  //         'success'
  //       );
  //       this.viderChamps();
  //       this.getBrief();
  //       Swal.close();
  //     },
  //     (error) => {
  //       console.error('Erreur lors de l\'ajout du projet :', error);
  //       // Gestion des erreurs ici
  //       if (error.status === 400) {
  //         // Erreur de validation du formulaire
  //         const errorMessages = error.error['hydra:description'];
  //         if (Array.isArray(errorMessages)) {
  //           // Si le message d'erreur est un tableau, vous pouvez le parcourir pour l'afficher
  //           errorMessages.forEach(errorMessage => {
  //             this.ressourceService.showAlert('Erreur !!', errorMessage, 'error');
  //           });
  //         } else {
  //           // Sinon, affichez le message d'erreur directement
  //           this.ressourceService.showAlert('Erreur !!', errorMessages, 'error');
  //         }
  //       } else {
  //         // Gestion des autres types d'erreurs
  //         this.ressourceService.showAlert('Erreur !!', 'Une erreur s\'est produite lors de l\'ajout du projet.', 'error');
  //       }
  //     });
  //   }
  //   //  else {
  //   //   console.log(this.titre, this.exactLiensupport, this.exactCahierdeCharge, this.exactNiveau);
  //   // }
  // }

  // Sweetalert
  showAlert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
  // Supression des immersion
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

  supprimerImmersion(immersion: any) {
    this.objToArray = Object.keys(immersion).map((key) => {
      return { cle: key, valeur: immersion[key] };
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
          this.ressourceService.deleteImmersion(id).subscribe(() => {
            this.ressourceService.showAlert(
              'Féliciation',
              'Immersion supprimé avec succès',
              'success'
            );
            this.getImerssion();
          });
        } else {
          console.error("ID de l'immersion est undefined");
        }
      }
    });
  }
  supprimerBrief(brief: any) {
    this.objToArray = Object.keys(brief).map((key) => {
      return { cle: key, valeur: brief[key] };
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
          this.ressourceService.deleteBrief(id).subscribe(() => {
            this.ressourceService.showAlert(
              'Féliciation',
              'Brief supprimé avec succès',
              'success'
            );
            this.getBrief();
          });
        } else {
          console.error('ID de brief est undefined');
        }
      }
    });
  }

  // Partie Modification Immersion
  chargerInfosImmersion(immersion: any) {
    this.objToArray = Object.keys(immersion).map((key) => {
      return { cle: key, valeur: immersion[key] };
    });
    const id = this.getId(this.objToArray[0].valeur);
    this.idImmersion = id;
    this.titre = immersion.titre;
    this.cahierDecharge = immersion.cahierDecharge;
    this.pdfUpload = immersion.pdfUpload;
    this.lien_support = immersion.lien_support;
  }

  // fonction pour modifier Immersion
  modifierImmersion(id: any) {
    this.idImmersion = id;
    const data = {
      titre: this.titre,
      cahierDecharge: this.cahierDecharge,
      // description: this.description,
      // lien_du_livrable: this.lien_du_livrable,
      lien_support: this.lien_support,
      // niveau_de_competence: this.niveau_de_competence,
    };
    this.ressourceService.updateImmersion(id, data).subscribe((response) => {});
    this.ressourceService.showAlert(
      'Bravo!',
      'Immersion modifié avec succés',
      'success'
    );
    this.viderChamps();
    this.getImerssion();
    Swal.close();
  }
  // Partie Modification Brief
  chargerInfosBrief(brief: any) {
    this.objToArray = Object.keys(brief).map((key) => {
      return { cle: key, valeur: brief[key] };
    });
    const id = this.getId(this.objToArray[0].valeur);
    this.idBrief = id;
    this.titre = brief.titre;
    // this.description = brief.description;
    this.lient_support = brief.lient_support;
    this.cahierDecharge = brief.cahierDecharge;
    this.niveau_de_competence = brief.niveau_de_competence;
  }

  // fonction pour modifier Brief
  modifierBrief(id: any) {
    // this.idBrief = id;
    this.idBrief = id;
    console.error('Le brief à update est :', id);
    const data = {
      titre: this.titre,
      // description: this.description,!
      cahierDecharge: this.cahierDecharge,
      lient_support: this.lient_support,
      niveau_de_competence: this.niveau_de_competence,
    };
    this.ressourceService.updateBrief(id, data).subscribe((response) => {
      console.warn("L'id d'abord si ca affiche", id);
      console.error('La reponse du service est :', response);
    });
    this.ressourceService.showAlert(
      'Bravo!',
      'Brief modifié avec succés',
      'success'
    );
    this.getBrief();
    this.viderChamps();
    Swal.close();
  }
}
