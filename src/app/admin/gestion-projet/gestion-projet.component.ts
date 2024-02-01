import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet.model';
import { LangageService } from 'src/app/services/langage.service';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-gestion-projet',
  templateUrl: './gestion-projet.component.html',
  styleUrls: ['./gestion-projet.component.css']
})
export class GestionProjetComponent implements OnInit{
  dtOptions: DataTables.Settings = {};

  // Les variables
  listeprojet:any[]=[];
  listeLangage:any[]=[];
  idProjet:number=0;
  titre:string='';
  description:string=''
  nombre_de_participant:number=0
  langage_de_programmation:string=''
  date_limite:string=''
  statu:string=''

  objToArray: any[] = [];

  constructor(
    private projetService: ProjetService,
    private langage : LangageService
    // private http : HttpClient,
  ){
  }

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
    this.getProjet()
    this.getLangage()
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

  // Liste des Projets ajoutés
  getProjet(): void {
    this.projetService.getProjet().subscribe((data: any) => {

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
  // Liste des langages de la base de données
   getLangage(): void {
    this.langage.getLangage().subscribe((data: any) => {

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

  viderChamps(){
    this.titre='';
    this.description='';
    this.nombre_de_participant=0;
    this.date_limite='';
  }
    // Ajout de projet
    AjoutProjet() {
      if ( this.titre =='') {
        this.projetService. showAlert(
          'error',
          'Attention',
          'Renseigner un titre'
        );
      } else if (this.description =='') {
        this.projetService. showAlert(
          'error',
          'Attention',
          'Renseigner une description'
        );

      } else if (this.nombre_de_participant == 0) {
        this.projetService. showAlert(
          'error',
          'Attention',
          'Renseigner le nombre de participant'
        );
      } else if (this.date_limite =='') {
        this.projetService. showAlert(
          'error',
          'Attention',
          'Renseigner un lien git'
        );
      }
      else {
        const newProjet: Projet = {
          titre:this.titre,
          description:this.description,
          // nombre_de_participant:this.nombre_de_participant,
          langage_de_programmation:this.langage_de_programmation,
          // nombre_de_participant: parseInt(this.nombre_de_participant, 10),
          nombre_de_participant: this.nombre_de_participant,
          date_limite:this.date_limite,
        };
        console.log('Après ajout :', this.titre, this.description, this.nombre_de_participant, this.date_limite, this.langage_de_programmation);

        this.projetService.addProjet(newProjet).subscribe((reponse) => {
          console.log('Réponse du service :', reponse);

          this.projetService. showAlert(
            'success',
            'Bravo!',
            'Projet ajouté avec succés'
          );
          this.viderChamps();
          this.getProjet();
        });
      }
    }
}
