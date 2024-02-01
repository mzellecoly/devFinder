import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'langageProgram'
})
export class LangageProgramPipe implements PipeTransform {

  transform(langage_id: any, listeLangage: any[]) {
    const objToArray = Object.keys(langage_id).map(key => {
      return { cle: key, valeur: langage_id[key]
      };
    });

    console.log(listeLangage, "sdfjfs");
    // const lang = listeLangage.find(p => p.id === langage_id);
    // console.log('le pipe de fall bah', objToArray);
    objToArray.forEach((obj: any) => {
      const current = listeLangage.find(item => item.langage_de_programmation === obj.valeur)

      return obj? obj.nom: 'N/A';
    })


  }
}
// transform(langage_id: number, produit: any[]): string {
//   const prod = produit.find(p => p.id === produit_id);
//   return prod ? prod.prixU : 'N/A';
// }
