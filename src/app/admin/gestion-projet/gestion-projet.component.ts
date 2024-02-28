import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet.model';
import { LangageService } from 'src/app/services/langage.service';
import { ProjetService } from 'src/app/services/projet.service';
import Swal from 'sweetalert2';
import { EditorModule } from '@tinymce/tinymce-angular';

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
  nombre_de_participant: any;
  langage_de_programmation: string = '';
  date_limite: string = '';
  CahierDecharge: string='';
  statu: string = '';
  projetSelectionne: any = {};
  public pdfUpload:any; // test

  objToArray: any[] = [];
  projetsTermines: any[] = [];
    // Ajoutez ces deux propriétés
    partieDuTexte: string | undefined;
    texteComplet: string | undefined;

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
  IsStatu:boolean=false;

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

    // Variables pour faire la vérifications
    verifNom: String = '';
    verifNinea: String = '';
    verifEmail: String = '';
    verifDate: String = '';
    verifDescription: String = '';
    verifTelephone: String = '';
    // Variables si les champs sont exacts
    exactNom: boolean = false;
    exactEmail: boolean = false;
    exactDate: boolean = false;
    // exactTelephone: boolean = false;
    // exactNinea: boolean = false;
    exactDescription: boolean = false;

  // Liste des Projets ajoutés
  getProjet(): void {
    this.projetService.getProjet().subscribe(
      (data: any) => {
        if ([data][0]['hydra:member'].length != 0) {
          this.listeprojet = [data][0]['hydra:member'];
          console.log('la liste de tous les projets',this.listeprojet);
          this.updateStatutProjets();
                  // Filtrer les projets terminés
        this.projetsTermines = this.listeprojet.filter(projet => projet.statu === 'Terminé');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }
  // Méthode pour récupérer les projets en cours uniquement
getProjetEnCours(): void {
  this.projetService.getProjet().subscribe(
    (data: any) => {
      if ([data][0]['hydra:member'].length != 0) {
        // Filtrer les projets en cours uniquement
        this.listeprojet = [data][0]['hydra:member'].filter((projet: any) => projet.statu !== 'Terminé');
        console.log(this.listeprojet);
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération des projets', error);
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
    this.langage_de_programmation='';
  }
    // Verification du nom
    verifTitreFonction() {
      this.exactNom = false;
      if (this.titre == '') {
        this.verifNom = 'Veuillez renseigner votre nom complet';
      } else if (this.titre.length < 5) {
        this.verifNom = 'Le nom est trop court';
      } else {
        this.verifNom = '';
        this.exactNom = true;
      }
       // Si le champ est vide, efface le message d'erreur
       if (this.titre == '') {
        this.verifNom = '';
      }
    }
    // Verification de la description
    verifDescriptionFonction() {
      this.exactDescription = false;
      if (this.description == '') {
        this.verifDescription = 'Veuillez renseigner une description';
      } else if (this.description.length < 30) {
        this.verifDescription = 'La description est trop courte';
      } else {
        this.verifDescription = '';
        this.exactDescription = true;
      }
       // Si le champ est vide, efface le message d'erreur
       if (this.description == '') {
        this.verifDescription = '';
      }
    }
    // Verification du cahier de charge
    verifCahierdeChargeFonction() {
      this.exactEmail = false;

      if (this.CahierDecharge == '') {
        this.verifEmail = 'Veuillez renseigner votre CahierDecharge';
      } else {
        this.verifEmail = '';
        this.exactEmail = true;
      }
       // Si le champ est vide, efface le message d'erreur
       if (this.CahierDecharge == '') {
        this.verifEmail = '';
      }
    }
    verifDateFonction() {
      this.exactDate = false;

      if (this.date_limite == '') {
        this.verifDate = 'Veuillez renseigner une date';
      } else if ( new Date(this.date_limite).toDateString() < new Date().toDateString()) {
        this.verifDate='Attention !!', 'La date limite ne peut pas être une date passée', 'error';
      } else {
        this.verifDate = '';
        this.exactDate = true;
      }
       // Si le champ est vide, efface le message d'erreur
       if (this.date_limite == '') {
        this.verifDate = '';
      }
    }

  // AjoutProjet() {
  //   this.verifTitreFonction();
  //   this.verifCahierdeChargeFonction();
  //   this.verifDateFonction();
  //   this.verifDescriptionFonction();
  //   if(this.exactNom && this.exactDescription && this.exactEmail && this.exactDate && this.exactDescription) {
  //     const newProjet: Projet = {
  //       titre: this.titre,
  //       description: this.description,
  //       langage_de_programmation: [this.langage_de_programmation], // Utilisez un tableau avec une seule chaîne
  //       nombre_de_participant: +this.nombre_de_participant,
  //       date_limite: this.date_limite,
  //       CahierDecharge: this.CahierDecharge,
  //       date_creation: new Date().toISOString(),
  //     };
  //     this.projetService.addProjet(newProjet).subscribe((reponse) => {
  //       console.log('Réponse du service :', reponse);
  //       this.projetService.showAlert('Bravo!!', 'Projet ajouté avec succès', 'success');
  //       this.viderChamps();
  //       this.getProjet();
        // this.updateStatutProjets();
      // },
      // (error) => {
      //   console.error('Erreur lors de l\'ajout du projet :', error);
        // Gestion des erreurs ici
        // if (error.status === 400) {
          // Erreur de validation du formulaire
          // const errorMessages = error.error['hydra:description'];
          // if (Array.isArray(errorMessages)) {
            // Si le message d'erreur est un tableau, vous pouvez le parcourir pour l'afficher
          //   errorMessages.forEach(errorMessage => {
          //     this.projetService.showAlert('Erreur !!', errorMessage, 'error');
          //   });
          // } else {
            // Sinon, affichez le message d'erreur directement
        //     this.projetService.showAlert('Erreur !!', errorMessages, 'error');
        //   }
        // } else {
          // Gestion des autres types d'erreurs
  //         this.projetService.showAlert('Erreur !!', 'Une erreur s\'est produite lors de l\'ajout du projet.', 'error');
  //       }
  //     });
  //   }
  // }
  showAlert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
    // Méthode pour afficher une partie du texte sur le tableau et tout le texte au niveau des détails
    getPartieDuTexte(texte: string, longueurMax: number): string {
      if (texte.length <= longueurMax) {
        return texte;
      } else {
        return texte.substring(0, longueurMax) + '...';
      }
    }
  //
  AjoutProjet() {
    this.verifTitreFonction();
    this.verifCahierdeChargeFonction();
    this.verifDateFonction();
    this.verifDescriptionFonction();
    if (this.titre == '') {
      this.showAlert('Erreur!', 'Veuillez remplir les champs', 'error');
    }
    else
    {
      let formData = new FormData();
      this.nombre_de_participant= parseInt(this.nombre_de_participant);
      formData.append("titre", this.titre);
      formData.append("description ", this.description);
      // formData.append("langage_de_programmation", this.langage_de_programmation);
      formData.append("nombre_de_participant", this.nombre_de_participant);
      formData.append("date_limite", this.date_limite);
      formData.append("CahierDecharge", this.pdfUpload);
      this.projetService.addProjet(formData).subscribe((reponse) => {
        console.log('Réponse du service :', reponse);
        this.projetService.showAlert('Bravo!!', 'Projet ajouté avec succès', 'success');
        this.viderChamps();
        this.getProjet();
        // this.updateStatutProjets();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du projet :', error);
        // Gestion des erreurs ici
        if (error.status === 400) {
          // Erreur de validation du formulaire
          const errorMessages = error.error['hydra:description'];
          if (Array.isArray(errorMessages)) {
            // Si le message d'erreur est un tableau, vous pouvez le parcourir pour l'afficher
            errorMessages.forEach(errorMessage => {
              this.projetService.showAlert('Erreur !!', errorMessage, 'error');
            });
          } else {
            // Sinon, affichez le message d'erreur directement
            this.projetService.showAlert('Erreur !!', errorMessages, 'error');
          }
        } else {
          // Gestion des autres types d'erreurs
          this.projetService.showAlert('Erreur !!', 'Une erreur s\'est produite lors de l\'ajout du projet.', 'error');
        }
      });

    }
  }


  // ------------------methode pour charger le champ input ---------
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
              'Supprimé!',
              'Projet supprimé avec succès',
              'success'
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
    this.pdfUpload = projet.pdfUpload;
    this.date_limite = projet.date_limite;
    this.nombre_de_participant = projet.nombre_de_participant;
  }

  // fonction pour modifier Projet
  // modifierProjet(id: any) {
  //   this.idProjet = id;
  //   const data = {
  //     titre: this.titre,
  //     description: this.description,
  //     langage_de_programmation: this.langage_de_programmation,
  //     nombre_de_participant: this.nombre_de_participant,
  //     date_limite: this.date_limite,
  //   };
  //   this.projetService.updateProjet(id, data).subscribe((response) => {});
  //   this.getProjet();
  //   this.projetService.showAlert(
  //     'Bravo!!',
  //     'Projet modifié avec succès',
  //     'success'
  //   );
  //   this.viderChamps();
  // }
  modifierProjet(id: any) {
   if (new Date(this.date_limite) < new Date()) {
      this.projetService.showAlert('Attention !!', 'La date limite ne peut pas être une date passée', 'error');
    }
    else{
    this.idProjet = id;
    const data = {
      titre: this.titre,
      description: this.description,
      langage_de_programmation: this.langage_de_programmation,
      nombre_de_participant: this.nombre_de_participant,
      date_limite: this.date_limite,
      statu: 'En cours'
    };

    // Appelez la mise à jour du projet dans le service
    this.projetService.updateProjet(id, data).subscribe((response) => {
      // Une fois la mise à jour terminée, récupérez les projets mis à jour
      this.getProjet();
      this.projetService.showAlert(
        'Bravo!!',
        'Projet modifié avec succès',
        'success'
      );
      this.viderChamps();
    });
  }
  }

  // Méthode pour afficher les détails du projet sélectionné
  afficherDetailsProjet(projet: Projet) {
    this.projetSelectionne = projet;
  }

  updateStatutProjets(): void {
    const currentDate = new Date();
    this.listeprojet.forEach((projet: any) => {
      const dateLimite = new Date(projet.date_limite);
      // Comparez la date limite avec la date actuelle
      if (dateLimite < currentDate) {
        // Si la date limite est passée, mettez à jour le statut du projet
        projet.statu = 'Terminé';
        console.log('statut de projet', projet.statu);
        // Appelez la méthode de mise à jour du projet dans le service
        this.projetService.updateProjet(projet.id, { statu: 'Terminé' }).subscribe(() => {
          console.log('Statut du projet mis à jour avec succès');
        }, (error) => {
          console.error('Erreur lors de la mise à jour du statut du projet', error);
        });
      }
    });
  }
}
