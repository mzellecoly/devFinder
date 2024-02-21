import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet.service';
import { LangageService } from '../services/langage.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  listeprojet: any[] = [];
  listeLangage: any[] = [];
  seletedProjet: any = {};

  constructor(
    private projetService: ProjetService,
    private langage: LangageService
  ) {}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/script.js';
    document.body.appendChild(script);
    localStorage.setItem('userOnline', JSON.stringify([]));
    this.getProjet();
    this.getLangage();
    // this.getTopThreeProjects()
  }

  // Liste des Projets ajoutés
  getProjet(): void {
    this.projetService.getProjet().subscribe(
      (data: any) => {
        if ([data][0]['hydra:member'].length != 0) {
          this.listeprojet = [data][0]['hydra:member'];
          console.log('les projets :',this.listeprojet);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des projet', error);
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
  getTopThreeProjects(): void {
    this.projetService.getProjet().subscribe(
      (data: any) => {
        if (data && data['hydra:member'] && data['hydra:member'].length >= 3) {
          this.listeprojet = data['hydra:member'].slice(0, 3); // Récupérer les trois premiers projets
          console.log('la liste esst :',this.listeprojet);
        } else {
          console.error("Il n'y a pas suffisamment de projets pour afficher trois projets.");
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }
  getDetailProjet(projet: any) {
    this.seletedProjet = projet;
  }
}
