export interface Entreprise{
  id?: number;
  email: string;
  mot_de_passe: string;
  nom_complet: string;
  roles: string;
  apprenants: [];
}
