import { Component, OnInit } from '@angular/core';
import { LangageService } from 'src/app/services/langage.service';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css'],
})
export class AccueilAdminComponent implements OnInit {
  listeprojet: any[] = [];
  listeLangage: any[] = [];
  titre: string = '';
  description: string = '';
  nombre_de_participant: number = 0;
  langage_de_programmation: string = '';
  date_limite: string = '';
  statu: string = '';

   // Attribut pour la pagination
   projetParPage = 3; // Nombre d'projet par page
   pageActuelle = 1; // Page actuelle

  constructor(
    private projetService: ProjetService,
    private langage: LangageService
  ) {}

  ngOnInit(): void {
    this.getProjet();
    this.getLangage();
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
  dataProjet : any []=[];
  searchProjet : string='';
  // Méthode pour déterminer lesprojet à afficher sur la page actuelle
  // getArticlesPage(): any[] {
  //   const indexDebut = (this.pageActuelle - 1) * this.projetParPage;
  //   const indexFin = indexDebut + this.projetParPage;
  //   this.dataProjet = this.listeprojet.filter((publica: { description: string; titre: string; }) =>
  //   publica.description.toLowerCase().includes(this.searchProjet.toLowerCase())||
  //   publica.titre.toLowerCase().includes(this.searchProjet.toLowerCase())
  //   );
  //   return this.dataProjet.slice(indexDebut, indexFin);
  // }
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.projetParPage;
    const indexFin = indexDebut + this.projetParPage;
    return this.listeprojet.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.listeprojet.length / this.projetParPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.listeprojet.length / this.projetParPage);
  }
}
