import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-profil-recrue',
  templateUrl: './profil-recrue.component.html',
  styleUrls: ['./profil-recrue.component.css']
})
export class ProfilRecrueComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  // listeUsers: any[] = [];
  listeUsers: any[] = [];
  idUser: string = '';

  constructor(
    private user : UtilisateurService,
  ){}

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
    this.idUser = localStorage.getItem('userId') ?? '';
    this.user.getRecrue(this.idUser).subscribe(
      (data: any) => {
        console.warn(data);
        this.listeUsers = data.apprenants;
        console.log("Informations de l'utilisateur récupérées :", this.listeUsers);
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          error
        );
      }
    );
  }

}
