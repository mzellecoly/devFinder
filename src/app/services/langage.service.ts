import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Langage } from '../models/langage.model';
import { url } from './apiUrl';
import Swal from 'sweetalert2';
import { User } from '../models/user.modele';
import { Competence } from '../models/competence.model';

@Injectable({
  providedIn: 'root'
})
export class LangageService {

  constructor(
    private http: HttpClient,
  ) { }

   // Liste
   getLangage() : Observable<any>{
    return this.http.get<Langage[]>(`${url}/langage/liste`);
  }
   getCompetences() : Observable<any>{
    return this.http.get<Langage[]>(`${url}/competence/liste`);
  }
   // Liste
   getAssociation() : Observable<any>{
    return this.http.get<User[]>(`${url}/association/liste`);
  }

  // Ajouter
  addLangage(compétence : Langage) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<any>(`${url}/competence/ajouter`, compétence,httpOptions);
  }

  // Suppression
  deleteLangage(id: number) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.delete<{ message: string }>(`${url}/competence/` + id, httpOptions);
    // return this.http.delete<{ message: string }>(`${url}/langage/` + id);
  }

  // Ajouter
  addCompetence(compétence : Langage) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<any>(`${url}/competence/ajouter`, compétence,httpOptions);
  }
  addCompetenceApprenant(compétence : Competence) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<any>(`${url}/apprenant/descriptionCompetence/ajouter`, compétence,httpOptions);
  }

  // Suppression
  deleteCompetence(id: number) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.delete<{ message: string }>(`${url}/competence/` + id, httpOptions);
    // return this.http.delete<{ message: string }>(`${url}/langage/` + id);
  }

  showAlert(title: any, text: any, icon: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
