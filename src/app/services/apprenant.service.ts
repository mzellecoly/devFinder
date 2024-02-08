import { Injectable } from '@angular/core';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { Projet } from '../models/projet.model';
import { url } from './api-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from '../models/user.modele';
import { Apprenant } from '../models/apprenant.model';
import { Entreprise } from '../models/entreprise.model';

@Injectable({
  providedIn: 'root',
})
export class ApprenantService {
  constructor(private http: HttpClient) {}

  // Liste
  // getApprenant(): Observable<any> {
  //   return this.http.get<Projet[]>(`${url}/apprenant/liste`);
  // }
  getProjetApprenant(id: string): Observable<Projet[]> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<Projet[]>(`${url}/apprenant/participer/projet/${id}`, httpOptions);
  }


  quitterProjet(id: number): Observable<any> {
    return this.http.post(`${url}/apprenant/quitter/projet/${id}`, {});
  }

  showAlert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
  // geteById
  getById(id: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<Projet>(`${url}/apprenant/participer/projet/${id}`, httpOptions);
  }
  geRecruById(id: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<User>(`${url}/entreprise/recruter/apprenant/${id}`, httpOptions);
  }
  getApprenant(id: any) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<Apprenant>(`${url}/apprenant/${id}`, httpOptions);
  }
  getAssociation(id: any) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<Entreprise>(`${url}/entreprise/${id}`, httpOptions);
  }

}
