import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brief } from 'src/app/models/brief.model';
import { Imerssion } from 'src/app/models/immersion.model';
import { RessourcesService } from 'src/app/services/ressources.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueilsuperadmin',
  templateUrl: './accueilsuperadmin.component.html',
  styleUrls: ['./accueilsuperadmin.component.css']
})
export class AccueilsuperadminComponent implements OnInit{

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
  listeUsers: any[] = [];

    // Attribut pour la pagination
    projetParPage = 3; // Nombre d'projet par page
    pageActuelle = 1; // Page actuelle
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
    private route: ActivatedRoute,
    private user : UtilisateurService
    ){}
  ngOnInit(): void {
    this.getBrief();
    this.getBrief1();
    this.getImerssion();
    // this.getImerssion1();
    this.getUser();
    console.warn(this.listeImerssion);
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
        console.log('la liste des briefs', this.listeBrief);
      }
      },
      (error) => {
        console.error('Erreur lors de la récupération des briefs', error);
      }
    );
  }
  getBrief1(): void {
    this.ressourceService.getBrief().subscribe((data :any)=>{
        this.listeBrief = data;
        console.log("les briefs sont là :", this.listeBrief);
    });
  }

  // Liste des imerssions ajoutés
  getImerssion(): void {
    this.ressourceService.getImerssion().subscribe((data: any) => {

      if ([data][0]['hydra:member'].length != 0) {
        this.listeImerssion = [data][0]['hydra:member'];
        console.log('La liste des immersion de la gloire est:', this.listeImerssion);
      }
      },
      (error) => {
        console.error('Erreur lors de la récupération des imerssions', error);
      }
    );
  }
  getImerssion1(): void {
    this.ressourceService.getImerssion().subscribe((data :any)=>{
      this.listeImerssion = data;
      console.log("les immersions de la gloire sont là :", this.listeImerssion);
  });
  }
  viderChamps(){
    this.titre='';
    this.description='';
    this.lien_support='';
    this.lient_support='';
    this.niveau_de_competence='';
  }

    // Sweetalert
    showAlert(title:any, text:any, icon:any){
      Swal.fire({
        title:title,
        text:text,
        icon:icon,
      });
    }
    getUser = () => {
      this.user.getUser().subscribe((data :any)=>{
          this.listeUsers = data.utilisateurs;
          // console.log(data);
          console.log('La liste est :', this.listeUsers);
      });
    }

     // Méthode pour déterminer lesprojet à afficher sur la page actuelle
     getArticlesPage(): any[] {
      const indexDebut = (this.pageActuelle - 1) * this.projetParPage;
      const indexFin = indexDebut + this.projetParPage;
      console.log('les immersions', (this.listeImerssion));
      return this.listeImerssion.slice(indexDebut, indexFin);
    }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.listeImerssion.length / this.projetParPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.listeImerssion.length / this.projetParPage);
  }

}
