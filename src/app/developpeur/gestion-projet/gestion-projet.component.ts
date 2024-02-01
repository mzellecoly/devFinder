import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-projet',
  templateUrl: './gestion-projet.component.html',
  styleUrls: ['./gestion-projet.component.css']
})
export class GestionProjetComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  // Déclaration des variables
  isProgress:boolean = true;
  isTerminate:boolean = false;
  isCancel:boolean = false;



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
  }

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

}
