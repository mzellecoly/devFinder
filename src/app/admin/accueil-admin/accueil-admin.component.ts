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
        console.error('Erreur lors de la récupération des briefs', error);
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
}
