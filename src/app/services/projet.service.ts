import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet.model';
import { Langage } from '../models/langage.model';
import { url } from './api-url.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor( private http: HttpClient) { }

  // Liste
  getProjet() : Observable<any>{
    return this.http.get<Projet[]>(`${url}/projet/liste`);
  }
   // Ajouter
   addProjet(projet : Projet) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<any>(`${url}/projet/ajouter`, projet,httpOptions);
  }

  // Suppression
  deleteProjet(id: number) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.delete<{ message: string }>(`${url}/projet/` + id, httpOptions);
  }

    // Modifier projet
    updateProjet(id: number, projet:any): Observable<any> {
      const token = localStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };
      return this.http.put<any>(`${url}/projet/` +id, projet, httpOptions);
    }

  showAlert(title: any, text: any, icon: any) {
    Swal.fire({
      title:title,
      text:text,
      icon:icon,
    });
  }
}
