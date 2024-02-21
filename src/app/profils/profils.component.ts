import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';
import { ApprenantService } from '../services/apprenant.service';
import Swal from 'sweetalert2';
import { User } from '../models/user.modele';

@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.css']
})
export class ProfilsComponent implements OnInit{
  listeProfils: any[] = [];
  seletedProfil: any = {};
  seletedProjet: any = {};
  profil: User | undefined;
  email :string="";
  mot_de_passe:string="";
  nom_complet:string="";
  idUser: string = '';
  listeprofil: any[] = [];
    objToArray: any[] = [];

      // Attribut pour la pagination
  projetParPage = 4; // Nombre d'projet par page
  pageActuelle = 1; // Page actuelle


  constructor(
    private utilisateur : UtilisateurService,
    private apprenantService :ApprenantService,
  ){
  }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('userId') ?? '';
    this.apprenantService.getAssociation(this.idUser).subscribe(
      (data: any) => {
        // console.warn(data);
        this.listeprofil = data.apprenants;
        console.log("Informations de l'utilisateur récupérées :", this.listeprofil);
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          error
        );
      }
    );
    this.getProfils();
  }


  getProfils = () => {
    this.utilisateur.getProfil().subscribe((data: any) => {

      if ([data][0]['hydra:member'].length != 0) {
        this.listeProfils = [data][0]['hydra:member'];
        console.log('la liste des utilisateurs', this.listeProfils);
      }
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }


  getDetailProfil(profil: any) {
    this.seletedProfil = profil;
    console.warn('le profil cliqué est', this.seletedProfil);
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

  // getProfilById() {
  //   if (this.seletedProfil) {
  //     this.objToArray = Object.keys(this.seletedProfil).map(key => {
  //       return { cle: key, valeur: this.seletedProfil[key]
  //       };
  //     });
  //     const id = this.getId(this.objToArray[0].valeur);
  //     const idProfil = this.seletedProfil.id;
  //     console.warn('L\'id du profil cliqué est :', id);

  //     console.log('element sélectionné', this.seletedProfil);
  //     console.log(id);
  //     console.log( 'terme',this.listeprofil)
  //     let profilChoisi= this.listeprofil.find((element:any)=> element.id==id)
  //     if (profilChoisi) {
  //       this.alertMessage(
  //         'error',
  //         'Attention',
  //         'Vous avez déja recruté ce profil'
  //       );
  //     } else{

  //     // Appeler le service pour récupérer le projet par son ID
  //     this.apprenantService.geRecruById(idProfil).subscribe(
  //       (profil) => {
  //         this.profil = profil;
  //         console.log('id baguini nak :', idProfil);
  //         console.warn('Profil récupéré :', profil);
  //         console.error('Profil récupéré :', idProfil);
  //         // Vous pouvez maintenant utiliser le projet dans votre composant
  //         this.alertMessage(
  //           'succes',
  //           'Feliciation',
  //           'Vous avez recruter ce profil!'
  //         );
  //         console.log( 'terme',this.listeprofil)
  //       },
  //       (error) => {
  //         console.error('Erreur lors du recrutement de ce profil :', error);
  //       }
  //     );}
  //   } else {
  //     console.log("L'objet seletedProfil est undefined ou null.");
  //   }
  // }
  getProfilById() {
    // Simuler l'idProfil sélectionné (supposons que cela soit récupéré correctement)
    const idProfil = this.seletedProfil.id;

    // Appeler le service pour recruter un apprenant en lui passant des données vides
    this.apprenantService.geRecruById(idProfil).subscribe(
      (profil) => {
        this.profil = profil;
        console.log('Profil récupéré :', profil);
        // Vous pouvez maintenant utiliser le profil dans votre composant

        // Afficher un message de succès
        this.alertMessage(
          'success',
          'Félicitations',
          'Vous avez recruté ce profil avec succès!'
        );
      },
      (error) => {
        console.error('Erreur lors du recrutement de ce profil :', error);

        // Afficher un message d'erreur
        this.alertMessage(
          'error',
          'Erreur',
          'Une erreur est survenue lors du recrutement de ce profil.'
        );
      }
    );
  }


  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
  dataProjet : any []=[];
  searchProjet : string='';

  // Méthode pour déterminer lesprojet à afficher sur la page actuelle
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.projetParPage;
    const indexFin = indexDebut + this.projetParPage;
    this.dataProjet = this.listeProfils.filter((publica: { email: string; nom_complet: string; }) =>
    publica.email.toLowerCase().includes(this.searchProjet.toLowerCase())||
    publica.nom_complet.toLowerCase().includes(this.searchProjet.toLowerCase())
    );
    return this.dataProjet.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.listeProfils.length / this.projetParPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.listeProfils.length / this.projetParPage);
  }
}
