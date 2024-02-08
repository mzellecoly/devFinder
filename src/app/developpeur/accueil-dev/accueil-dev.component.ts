import { Component, OnInit } from '@angular/core';
import { ApprenantService } from 'src/app/services/apprenant.service';
import { LangageService } from 'src/app/services/langage.service';

@Component({
  selector: 'app-accueil-dev',
  templateUrl: './accueil-dev.component.html',
  styleUrls: ['./accueil-dev.component.css']
})
export class AccueilDevComponent implements OnInit{
  listeProjet:any[]=[];
  titre: string = '';
  description: string = '';
  nombre_de_participant: number = 0;
  langage_de_programmation: string = '';
  date_limite: string = '';
  statu: string = '';
  idUser:string='';

  constructor(
    private projetService: ApprenantService,
    private langage: LangageService,
    private apprenantService: ApprenantService
  ) {}
  
  ngOnInit(): void {
      // this.idUser = localStorage.getItem('userId');
      this.idUser = localStorage.getItem('userId') ?? '';
      this.apprenantService.getApprenant(this.idUser).subscribe(
        (data: any) => {
         this.listeProjet= data.projet
          console.log('Informations de l\'utilisateur récupérées :', data.projet);
        },
        (error) => {
          console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
        }
      );
  }

}
