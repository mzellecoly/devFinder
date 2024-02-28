import { Injectable } from '@angular/core';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { Projet } from '../models/projet.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from '../models/user.modele';
import { Apprenant } from '../models/apprenant.model';
import { Entreprise } from '../models/entreprise.model';
import { url } from './apiUrl';

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
  getApprenanst(id: string): Observable<Projet[]> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<Projet[]>(`${url}/apprenant/${id}`, httpOptions);
  }


  quitterProjet(id: number): Observable<any> {
    return this.http.post(`${url}/apprenant/quitter/projet/${id}`, {});
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
  // geteById
  getById(id: string) {
    const token = localStorage.getItem('token');
    const data = "";
    const httpOptions = {
      headers: new HttpHeaders({

        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<Projet>(`${url}/apprenant/participer/projet/${id}`, httpOptions);
  }
  geRecruById(id: string) {
    const token = localStorage.getItem('token');

    // console.log(token);

    const httpOptions = {
      headers: new HttpHeaders({

        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
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
  getAssociations(id: any) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<Entreprise>(`${url}/apprenant/descriptionCompetence/liste/`, httpOptions);
  }
  getDescripCompetence() : Observable<any>{
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get<Entreprise>(`${url}/apprenant/descriptionCompetence/liste/`, httpOptions);
  }

    // Suppression
    deleteDescripCompetence(id: number) {
      const token = localStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };
      return this.http.delete<{ message: string }>(`${url}/apprenant/descriptionCompetence/` + id, httpOptions);
      // return this.http.delete<{ message: string }>(`${url}/langage/` + id);
    }
    updateDescripCompetence(id: number, description:any): Observable<any> {
      const token = localStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };
      return this.http.put<any>(`${url}/apprenant/descriptionCompetence/` +id, description, httpOptions);
    }
}
