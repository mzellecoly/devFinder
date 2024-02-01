import { Component, OnInit } from '@angular/core';
import { Langage } from 'src/app/models/langage.model';
import { LangageService } from 'src/app/services/langage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionlangage',
  templateUrl: './gestionlangage.component.html',
  styleUrls: ['./gestionlangage.component.css']
})
export class GestionlangageComponent implements OnInit{

  nom: string ='';
  listeLangage:any[]=[];
  objToArray: any[] = [];

  constructor(private langage : LangageService){
  }

  ngOnInit(): void {
    this.getLangage();
  }
  // Liste des langaes ajoutés
  getLangage(): void {
    this.langage.getLangage().subscribe((data: any) => {

      if ([data][0]['hydra:member'].length != 0) {
        this.listeLangage = [data][0]['hydra:member'];
        console.log(this.listeLangage);
      }
      },
      (error) => {
        console.error('Erreur lors de la récupération des langages', error);
      }
    );
  }

  // Méthode pour vider les champs du formulaire
  viderChamps(){
    this.nom='';
  }

  // Méthode pour ajouter un langage
  // Ajout des immersion
    ajoutLangage() {
      if ( this.nom =='') {
        this.langage. showAlert(
          'Error',
          'Attention',
          'Renseigner un nom'
        );
      }
      else {
        console.log('Avant ajout :', this.nom);
        const newLangage: Langage = {
          nom:this.nom,
        };
        console.log('Après ajout :', this.nom);

        this.langage.addLangage(newLangage).subscribe((reponse) => {
          console.log('Réponse du service :', reponse);

          this.langage. showAlert(
            'Success',
            'Bravo!',
            'Langage ajouté avec succés'
          );
          this.viderChamps();
          this.getLangage();
        });
      }
    }

    getId(uri:any){
      const idMatch = uri.match(/\/(\d+)$/);
      if (idMatch) {
        const id = idMatch[1];
        console.error('L\'Id à mettre', id);
        return id;
      } else {
        console.log("Aucun ID trouvé dans l'URI");
      }
    }

     supprimerLangage(langage : any) {
    this.objToArray = Object.keys(langage).map(key => {
      return { cle: key, valeur: langage[key]
      };
    });
    const id = this.getId(this.objToArray[0].valeur);
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas revenir en arrière après cette action!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0F2A3D',
        cancelButtonColor: '#FFA439',
        confirmButtonText: 'Oui, supprimer!',
      }).then((result) => {
        if (result.isConfirmed) {
          if (id) {
            this.langage.deleteLangage(id).subscribe(() => {
              this.langage.showAlert(
                'success',
                'Supprimé!',
                'Langage supprimé avec succès'
              );
              this.getLangage();
            });
        }else{
          console.error("ID du langage est undefined");
        }
      }
      });
    }
}
