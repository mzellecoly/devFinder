import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toArray } from 'rxjs';
import { Brief } from 'src/app/models/brief.model';
import { Imerssion } from 'src/app/models/immersion.model';
import { RessourcesService } from 'src/app/services/ressources.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit{
  dtOptions: DataTables.Settings = {};

  listeBrief:any[]=[];
  listeImerssion:any[]=[];
  idBrief:number=0;
  idImmersion:number=0;
  titre:string='';
  description:string=''
  niveau_de_competence:string=''
  lien_support:string=''
  lient_support:string=''
  lien_du_livrable:string=''


  objToArray: any[] = [];

  briefSelectionne: any ={};
  imerssionSelectionne: any ={};

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
    private http : HttpClient,
    private route: ActivatedRoute,){}

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
    this.texteComplet = this.projet1.description;
    this.partieDuTexte = this.getPartieDuTexte(this.texteComplet, 50);
    this.getBrief();
    this.getImerssion();
  }

  // Déclaration des variables pour le filtre
  isProgress:boolean = true;
  isTerminate:boolean = false;
  isCancel:boolean = false;

  // Déclaration des méthodes pour le filtre

  // Voir les projets urbaines pour le filtre
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
  // Méthode pour afficher une partie du texte sur le tableau et tout le texte au niveau des détails
  getPartieDuTexte(texte: string, longueurMax: number): string {
    if (texte.length <= longueurMax) {
      return texte;
    } else {
      return texte.substring(0, longueurMax) + '...';
    }
  }
  updatePartieDuTexte(texteComplet: string) {
    this.partieDuTexte = this.getPartieDuTexte(texteComplet,20);
  }

// Liste des briefs ajoutés
  getBrief(): void {
    this.ressourceService.getBrief().subscribe((data: any) => {

      if ([data][0]['hydra:member'].length != 0) {
        this.listeBrief = [data][0]['hydra:member'];
        console.log(this.listeBrief);
      }
      },
      (error) => {
        console.error('Erreur lors de la récupération des briefs', error);
      }
    );
  }
  // Liste des imerssions ajoutés
  getImerssion(): void {
    this.ressourceService.getImerssion().subscribe((data: any) => {

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
  viderChamps(){
    this.titre='';
    this.description='';
    this.niveau_de_competence='';
    this.lien_support='';
    this.lient_support='';
    this.lien_du_livrable='';
  }

  // Ajout des immersion
  AjoutImmersion() {
    if ( this.titre =='') {
      this.ressourceService. showAlert(
        'error',
        'Attention',
        'Renseigner un titre'
      );
    } else if (this.description =='') {
      this.ressourceService. showAlert(
        'error',
        'Attention',
        'Renseigner une description'
      );

    } else if (this.niveau_de_competence =='') {
      this.ressourceService. showAlert(
        'error',
        'Attention',
        'Renseigner un niveau de compétence'
      );

    } else if (this.lien_support =='') {
      this.ressourceService. showAlert(
        'error',
        'Attention',
        'Renseigner un lien de support'
      );
    } else if (this.lien_du_livrable =='') {
      this.ressourceService. showAlert(
        'error',
        'Attention',
        'Renseigner un lien git'
      );
    }
    else {
      console.log('Avant ajout :', this.titre, this.description, this.niveau_de_competence, this.lien_support, this.lien_du_livrable);
      const newImerssion: Imerssion = {
        titre:this.titre,
        description:this.description,
        niveau_de_competence:this.niveau_de_competence,
        lien_support:this.lien_support,
        // lient_support:this.lien_support,
        lien_du_livrable:this.lien_du_livrable
      };
      console.log('Après ajout :', this.titre, this.description, this.niveau_de_competence, this.lien_support, this.lien_du_livrable);

      this.ressourceService.ajoutImmersion(newImerssion).subscribe((reponse) => {
        console.log('Réponse du service :', reponse);

        this.ressourceService. showAlert(
          'success',
          'Bravo!',
          'Imerssion ajouté avec succés'
        );
        this.viderChamps();
        this.getImerssion();
      });
    }
  }

  // Ajout des briefs
  AjoutBrief() {
    if ( this.titre =='') {
      this.ressourceService. showAlert(
        'error',
        'Attention',
        'Renseigner un titre'
      );
    } else if (this.description =='') {
      this.ressourceService. showAlert(
        'error',
        'Attention',
        'Renseigner une description'
      );

    } else if (this.niveau_de_competence =='') {
      this.ressourceService. showAlert(
        'error',
        'Attention',
        'Renseigner un niveau de compétence'
      );

    } else if (this.lien_support =='') {
      this.ressourceService. showAlert(
        'error',
        'Attention',
        'Renseigner un lien de support'
      );
    } else if (this.lien_du_livrable =='') {
      this.ressourceService. showAlert(
        'error',
        'Attention',
        'Renseigner un lien git'
      );
    }
    else {
      console.log('Avant ajout :', this.titre, this.description, this.niveau_de_competence, this.lien_support, this.lien_du_livrable);
      const newBrief: Brief = {
        titre: this.titre,
        description: this.description,
        niveau_de_competence: this.niveau_de_competence,
        lient_support: this.lien_support,
        lien_du_livrable: this.lien_du_livrable,
        // lien_support: ''
      };
      console.log('Après ajout brief:', this.titre, this.description, this.niveau_de_competence, this.lien_support, this.lien_du_livrable);

      this.ressourceService.ajoutBrief(newBrief).subscribe((reponse) => {
        console.log('Réponse du service :', reponse);

        this.ressourceService. showAlert(
          'success',
          'Bravo!',
          'Brief ajouté avec succés'
        );
        this.viderChamps();
        this.getBrief();
      });
    }
  }

    // Sweetalert
    showAlert(title:any, text:any, icon:any){
      Swal.fire({
        title:title,
        text:text,
        icon:icon,
      });
    }
     // Supression des immersion
    getId(uri:any){
      const idMatch = uri.match(/\/(\d+)$/);
      if (idMatch) {
        const id = idMatch[1];
        console.error('L\'Id à mettre', id);
        return id;
      } else {
        console.log("Aucun ID trouvé dans l'URI");
      }
    }

  supprimerImmersion(immersion : any) {
    this.objToArray = Object.keys(immersion).map(key => {
      return { cle: key, valeur: immersion[key]
      };
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
                'success',
                'Supprimé!',
                'Immersion supprimé avec succès'
              );
              this.getImerssion();
            });
        }else{
          console.error("ID de l'immersion est undefined");
        }
      }
      });
    }
  supprimerBrief(brief : any) {
    this.objToArray = Object.keys(brief).map(key => {
      return { cle: key, valeur: brief[key]
      };
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
                'success',
                'Supprimé!',
                'Brief supprimé avec succès'
              );
              this.getBrief();
            });
        }else{
          console.error("ID de brief est undefined");
        }
      }
      });
    }

    // Partie Modification Immersion
    chargerInfosImmersion(immersion: any) {
      this.objToArray = Object.keys(immersion).map(key => {
      return { cle: key, valeur: immersion[key]
      };
    });
    const id = this.getId(this.objToArray[0].valeur);
    this.idImmersion = id;
    this.titre = immersion.titre;
    this.description = immersion.description;
    this.lien_du_livrable = immersion.lien_du_livrable;
    this.lien_support = immersion.lien_support;
    this.niveau_de_competence = immersion.niveau_de_competence;
    }

    // fonction pour modifier Immersion
  modifierImmersion(id: any) {
    this.idImmersion = id;
    const data = {
      titre: this.titre,
      description: this.description,
      lien_du_livrable: this.lien_du_livrable,
      lien_support: this.lien_support,
      niveau_de_competence: this.niveau_de_competence,
    }
    this.ressourceService.updateImmersion(id, data).subscribe((response) => {
    });
    this.viderChamps();
    this.getImerssion();
  }
    // Partie Modification Brief
    chargerInfosBrief(brief: any) {
      this.objToArray = Object.keys(brief).map(key => {
      return { cle: key, valeur: brief[key]
      };
    });
    const id = this.getId(this.objToArray[0].valeur);
    this.idBrief = id;
    this.titre = brief.titre;
    this.description = brief.description;
    this.lien_du_livrable = brief.lien_du_livrable;
    this.lient_support = brief.lient_support;
    this.niveau_de_competence = brief.niveau_de_competence;
    }

    // fonction pour modifier Brief
  modifierBrief(id: any) {
    // this.idBrief = id;
    this.idBrief = id;
    console.error('Le brief à update est :', id);
    const data = {
      titre: this.titre,
      description: this.description,
      lien_du_livrable: this.lien_du_livrable,
      lient_support: this.lient_support,
      niveau_de_competence: this.niveau_de_competence,
    }
    this.ressourceService.updateBrief(id, data).subscribe((response) => {
      console.warn('L\'id d\'abord si ca affiche', id)
      console.error('La reponse du service est :', response);
    });
    this.viderChamps();
    this.getBrief();
  }

}
