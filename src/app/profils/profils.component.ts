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

  constructor(
    private utilisateur : UtilisateurService,
    private apprenantService :ApprenantService,
  ){
  }

  ngOnInit(): void {
    // this.idUser = localStorage.getItem('userId') ?? '';
    // this.apprenantService.getAssociation(this.idUser).subscribe(
    //   (data: any) => {
    //     console.warn(data);
    //     this.listeprofil = data;
    //     console.log("Informations de l'utilisateur récupérées :", this.listeprofil);
    //     const idProfil = this.seletedProfil.id;
    //    let profilChoisi=this.listeprofil.find((element:any) => element.id==idProfil)
    //    console.log('element sélectionné', this.seletedProfil);
    //    console.log(idProfil);
    //    console.log(profilChoisi);
    //   },
    //   (error) => {
    //     console.error(
    //       "Erreur lors de la récupération des informations de l'utilisateur :",
    //       error
    //     );
    //   }
    // );
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
    this.utilisateur.getProfil().subscribe((data :any)=>{
        this.listeProfils = data;
        console.error('La liste est :', this.listeProfils);
    });
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
  getProfilById() {
    if (this.seletedProfil) {
      const idProfil = this.seletedProfil.id;
      // console.warn('L\'id du profil cliqué est :', idProfil);

      console.log('element sélectionné', this.seletedProfil);
      console.log(idProfil);
      console.log( 'terme',this.listeprofil)
      let profilChoisi= this.listeprofil.find((element:any)=> element.id==idProfil)
      if (profilChoisi) {
        this.alertMessage(
          'error',
          'Attention',
          'Vous avez déja recruté ce profil'
        );
      } else{

      // Appeler le service pour récupérer le projet par son ID
      this.apprenantService.geRecruById(idProfil).subscribe(
        (profil) => {
          this.profil = profil;
          console.log('id baguini nak :', idProfil);
          console.warn('Projet récupéré :', profil);
          console.error('Projet récupéré :', idProfil);
          // Vous pouvez maintenant utiliser le projet dans votre composant
          this.alertMessage(
            'succes',
            'Feliciation',
            'Vous avez recruter ce profil!'
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération du projet :', error);
        }
      );}
    } else {
      console.log("L'objet seletedProfil est undefined ou null.");
    }
  }

  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
