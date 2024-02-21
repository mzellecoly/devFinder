import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { url } from './api-url.service';
import { User } from '../models/user.modele';
import { Entreprise } from '../models/entreprise.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient, private router: Router,) { }

  // Lister les utilisateurs
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<User[]>(`${url}/administrateur/liste/utilisateurs`, httpOptions);
  }
  getUserBan(): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<User[]>(`${url}/administrateur/liste/utilisateursBloque`, httpOptions);
  }
  getBrief(): Observable<any> {
    return this.http.get<User[]>(`${url}/brief/liste`);
  }
  getUserInfo(): any {
    const userString = localStorage.getItem('userOnline');
    return userString ? JSON.parse(userString) : null;
  }

  updateUser(id: number, projet:any): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.put<any>(`${url}/administrateur/${id}`, projet, httpOptions);
  }
  updateAsso(id: number, projet:any): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.put<any>(`${url}/association/${id}`, projet, httpOptions);
  }

  getProfil(): Observable<any> {
    return this.http.get<User[]>(`${url}/apprenant/liste`,);
  }
  getRecrue(id: any) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<Entreprise>(`${url}/entreprise/${id}`, httpOptions);
  }
   // Méthode pour bloquer un utilisateur
   blockUser(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.patch<any>(`${url}/apprenant/monitorerAccess/${id}`, data, httpOptions);
  }
  // Cest le service
  bloquerUtilisateur(id: number,newState: boolean): Observable<{ message: string }> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('Utilisateur non connecté');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Construire l'URL en fonction du nouvel état de blocage
    const urlWithState = `${url}/apprenant/monitorerAccess/${id}`;

    return this.http.patch<{ message: string }>(urlWithState, { headers });
  }
  debloquerUtilisateur(id: number): Observable<{ message: string }> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return throwError('Utilisateur non connecté');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    const urlWithState = `${url}/debloquerUser/${id}`;

    return this.http.patch<{ message: string }>(urlWithState, { headers });
  }
}
