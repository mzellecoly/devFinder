import { Component, OnInit } from '@angular/core';
import { Brief } from '../models/brief.model';
import { Imerssion } from '../models/immersion.model';
import { RessourcesService } from '../services/ressources.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  listeImerssion: any[] = [];
  listeImerssionFilter: any[] = [];
  listeBrief: any[] = [];
  listeBriefFilter: any[] = [];
  listeLangage: any[] = [];
  selectedLangage: string = '';
  filterValue: string = '';
  seletedArticles: any = {};
  imerssion: Imerssion | undefined;
  brief: Brief | undefined;
  hasParticipated: boolean = false;
  idUser: string = '';
  listeArticles: any[] = [];
  // idProjet:number=0;
  idaArticle: string = '';
  searchTerm: string = '';

  // objToArray: any[] = [];
  objToArray: { cle: string; valeur: any }[] = [];

  // Attribut pour la pagination
  projetParPage = 3; // Nombre d'projet par page
  pageActuelle = 1; // Page actuelle

  constructor(private ressourceService: RessourcesService) {}

  ngOnInit(): void {
    this.getImerssion();
    this.getBrief();
  }

  // Liste des imerssions ajoutés
  getImerssion(): void {
    this.ressourceService.getImerssion().subscribe(
      (data: any) => {
        if ([data][0]['hydra:member'].length != 0) {
          this.listeImerssion = [data][0]['hydra:member'];
          this.listeImerssionFilter=this.listeImerssion
          console.log('La liste des immersion est:', this.listeImerssion);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des imerssions', error);
      }
    );
  }

  onSearch() {
    // Recherche se fait selon le nom et  status
    this.listeImerssionFilter = this.listeImerssion.filter(
      (elt: any) =>
        elt?.titre.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.imageName.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }
  onSearche() {
    // Recherche se fait selon le nom et  status
    this.listeBriefFilter = this.listeBrief.filter(
      (elt: any) =>
        elt?.titre.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.imageName.toLowerCase().includes(this.filterValue.toLowerCase())
    );
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
  getDetailProjet(brief: any) {
    this.seletedArticles = brief;
    console.log("l'article selectionné", this.seletedArticles);
  }
  getDetailProjets(immersion: any) {
    this.seletedArticles = immersion;
    console.log("l'article selectionné", this.seletedArticles);
  }
  dataProjet: any[] = [];
  searchProjet: string = '';
  dataBrief: any[] = [];
  searchBrief: string = '';

  // Méthode pour déterminer lesprojet à afficher sur la page actuelle
  // getArticlesPage(): any[] {
  //   const indexDebut = (this.pageActuelle - 1) * this.projetParPage;
  //   const indexFin = indexDebut + this.projetParPage;
  //   this.dataProjet = this.listeImerssion.filter((publica: { description: string; titre: string; }) =>
  //   publica.description.toLowerCase().includes(this.searchProjet.toLowerCase())||
  //   publica.titre.toLowerCase().includes(this.searchProjet.toLowerCase())
  //   );
  //   return this.dataProjet.slice(indexDebut, indexFin);
  // }
  // getArticlesPages(): any[] {
  //   const indexDebut = (this.pageActuelle - 1) * this.projetParPage;
  //   const indexFin = indexDebut + this.projetParPage;
  //   this.dataBrief = this.listeBrief.filter((publica: { description: string; titre: string; }) =>
  //   publica.description.toLowerCase().includes(this.searchBrief.toLowerCase())||
  //   publica.titre.toLowerCase().includes(this.searchBrief.toLowerCase())
  //   );
  //   return this.dataBrief.slice(indexDebut, indexFin);
  // }
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.projetParPage;
    const indexFin = indexDebut + this.projetParPage;
    return this.listeImerssion.slice(indexDebut, indexFin);
  }
  getArticlesPages(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.projetParPage;
    const indexFin = indexDebut + this.projetParPage;
    return this.listeBrief.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(
      this.listeImerssion.length / this.projetParPage
    );
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.listeImerssion.length / this.projetParPage);
  }
}
