export interface Projet{
  id?: number;
  titre: string;
  description: string;
  nombre_de_participant: number;
  // langage_de_programmation: string;
  langage_de_programmation: string[];
  // langage_de_programmation: string[]
  date_limite: string;
  hasParticipated?: boolean;
}
