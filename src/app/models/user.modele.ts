export interface User{
  id?: number;
  email: string;
  mot_de_passe: string;
  nom_complet: string;
  telephone: string;
  description:string
  numero_identification_naitonal?:string
  etat?:boolean
}
