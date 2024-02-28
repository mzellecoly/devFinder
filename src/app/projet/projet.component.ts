import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet.service';
import { LangageService } from '../services/langage.service';
import { ApprenantService } from '../services/apprenant.service';
import { Projet } from '../models/projet.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css'],
})
export class ProjetComponent implements OnInit {
  listeprojet: any[] = [];
  listeprojetFilter: any[] = [];
  listeLangage: any[] = [];
  selectedLangage: string = '';
  filterValue: string = '';
  seletedProjet: any = {};
  projet: Projet | undefined;
  hasParticipated: boolean = false;
  idUser: string = '';
  listeProjet: any[] = [];
  // idProjet:number=0;
  idProjet: string = '';
  searchTerm: string = '';

  // objToArray: any[] = [];
  objToArray: { cle: string; valeur: any }[] = [];

  // Attribut pour la pagination
  projetParPage = 4; // Nombre d'projet par page
  pageActuelle = 1; // Page actuelle


  constructor(
    private projetService: ProjetService,
    private langage: LangageService,
    private apprenantService: ApprenantService
  ) {}
  ngOnInit(): void {
    this.idUser = localStorage.getItem('userId') ?? '';
    this.apprenantService.getApprenant(this.idUser).subscribe(
      (data: any) => {
        console.warn(data);
        this.listeProjet = data.projet;
        console.log("Informations de l'utilisateur récupérées :", data.projet);
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          error
        );
      }
    );
    this.getProjet();
    this.getLangage();
    // this.getAllProjets();
  }

  // getAllProjets = () => {
  //   this.projetService.getProjet().subscribe((data :any)=>{
  //       this.listeprojet = data;
  //       console.log('les projets', this.listeprojet);
  //   });
  // }
  // Liste des Projets ajoutés
  getProjet(): void {
    this.projetService.getProjet().subscribe(
      (data: any) => {
        if ([data][0]['hydra:member'].length != 0) {
          this.listeprojet = [data][0]['hydra:member'];
          this.listeprojetFilter=this.listeprojet
          console.log('La liste des projets est :',this.listeprojet);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }

  filterProjetByLangage(langage: string): void {
    this.selectedLangage = langage;
    console.log('Langage sélectionné :', langage);
    this.getProjet();
  }
  onSearch() {
    // Recherche se fait selon le nom et  status
    this.listeprojetFilter = this.listeprojet.filter(
      (elt: any) =>
        elt?.titre.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.imageName.toLowerCase().includes(this.filterValue.toLowerCase())
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
  getDetailProjet(projet: any) {
    this.seletedProjet = projet;
  }

  getId(uri: any) {
    const idMatch = uri.match(/\/(\d+)$/);
    if (idMatch) {
      const id = idMatch[1];
      console.error("L'Id à mettre", id);
      return id;
    } else {
      console.log("Aucun ID trouvé dans l'URI");
    }
  }
  getProjetById() {
    if (this.seletedProjet) {
      const idProjet = this.getId(this.seletedProjet['@id']);
      let projetChoisi= this.listeProjet.find((element:any)=> element.id==idProjet)
      console.log('l\'id est :', idProjet);
      if (projetChoisi) {
        this.alertMessage(
          'error',
          'Attention!!',
          'Vous participer déja à ce projet'
        );
      } else{
      // Appeler le service pour récupérer le projet par son ID
      this.apprenantService.getById(idProjet).subscribe(
        (projet) => {
          this.projet = projet;
          console.log('id baguini nak :', idProjet);
          console.warn('Projet récupéré :', projet);
          console.error('Projet récupéré :', idProjet);
          // Vous pouvez maintenant utiliser le projet dans votre composant
          this.alertMessage(
            'success',
            'Felicitation!!',
            'Vous participer maintenant à ce projet!'
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération du projet :', error);
        }
      );}
    } else {
      console.log("L'objet seletedProjet est undefined ou null.");
    }
  }

  dataProjet : any []=[];
  searchProjet : string='';

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
    // Fonction pour afficher un sweetalert
    alertMessage(icon: any, title: any, text: any) {
      Swal.fire({
        icon: icon,
        title: title,
        text: text,
      });
    }
}
