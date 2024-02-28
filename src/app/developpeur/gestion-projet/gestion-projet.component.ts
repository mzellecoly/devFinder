import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Apprenant } from 'src/app/models/apprenant.model';
import { Projet } from 'src/app/models/projet.model';
import { User } from 'src/app/models/user.modele';
import { ApprenantService } from 'src/app/services/apprenant.service';
import { LangageService } from 'src/app/services/langage.service';

@Component({
  selector: 'app-gestion-projet',
  templateUrl: './gestion-projet.component.html',
  styleUrls: ['./gestion-projet.component.css'],
})
export class GestionProjetComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  // Déclaration des variables
  isProgress: boolean = true;
  isTerminate: boolean = false;
  isCancel: boolean = false;
  listeProjet: any[] = [];
  listeLangage: any[] = [];
  listeAssociation: any[] = [];
  titre: string = '';
  description: string = '';
  nombre_de_participant: number = 0;
  langage_de_programmation: string = '';
  date_limite: string = '';
  statu: string = '';
  idUser: string = '';
  projetSelectionne: any = {};
    // Ajoutez ces deux propriétés
    partieDuTexte: string | undefined;
    texteComplet: string | undefined;


  constructor(
    private projetService: ApprenantService,
    private langage: LangageService,
    private apprenantService: ApprenantService
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
    this.idUser = localStorage.getItem('userId') ?? '';
    this.apprenantService.getApprenant(this.idUser).subscribe(
      (data: any) => {
        // console.warn(data);
        this.listeProjet = data.projet;
        console.log("Informations de l'utilisateur récupérées :", this.listeProjet);
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          error
        );
      }
    );
    this.getLangage();
    this.updateStatus();
    this.getAssociation();
  }

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

    // Méthode pour afficher une partie du texte sur le tableau et tout le texte au niveau des détails
    // getPartieDuTexte(texte: string, longueurMax: number): string {
    //   if (texte.length <= longueurMax) {
    //     return texte;
    //   } else {
    //     return texte.substring(0, longueurMax) + '...';
    //   }
    // }
    // updatePartieDuTexte(texteComplet: string) {
    //   this.partieDuTexte = this.getPartieDuTexte(texteComplet,50);
    // }

  // Ajoutez la méthode getLangageName
  getLangageName(langageUrl: string): string {
    const langage = this.listeLangage.find(
      (lang) => lang['@id'] === langageUrl
    );
    console.log('le nom du langage', langageUrl);
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


  // Liste des associations de la base de données
  getAssociation(): void {
    this.langage.getAssociation().subscribe(
      (data: any) => {
        if ([data][0]['hydra:member'].length != 0) {
          this.listeAssociation = [data][0]['hydra:member'];
          console.log('La liste des Association', this.listeAssociation);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des associations', error);
      }
    );
  }
    getAssoName(assoUrl: string): string {
      // Extraire l'ID de l'association de l'URL
      const associationId = assoUrl.split('/').pop();

      // Rechercher l'association dans la liste des associations en utilisant son ID
      const association = this.listeAssociation.find(asso => asso['@id'] === assoUrl);

      console.log('ID de l\'association:', associationId);

      // Renvoyer le nom de l'association s'il est trouvé, sinon "Association inconnue"
      return association ? association.nom : 'Association inconnue';
    }

  // Méthode pour mettre à jour le statut des projets en fonction de la date limite
  updateStatus(): void {
    const currentDate = new Date();
    this.listeProjet.forEach((projet) => {
      const deadline = new Date(projet.date_limite);
      projet.statu = deadline < currentDate ? 'En cours' : 'Terminé';
    });
  }
  afficherDetailsProjet(projet: Projet) {
    this.projetSelectionne = projet;
  }
}
