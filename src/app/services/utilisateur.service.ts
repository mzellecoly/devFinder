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

  // Lister les briefs
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<User[]>(`${url}/administrateur/liste/utilisateur`, httpOptions);
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
    return this.http.put<any>(`${url}/administrateur/` +id, projet, httpOptions);
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

  bloquerUtilisateur(id: number, newState: boolean): Observable<{ message: string }> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return throwError('Utilisateur non connecté');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    // Construire l'URL en fonction du nouvel état de blocage
    const urlWithState = `${url}/apprenant/monitorer/${id}?bloque=${newState}`;

    return this.http.delete<{ message: string }>(urlWithState, { headers });
  }

  debloquerUtilisateur(id: number): Observable<{ message: string }> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return throwError('Utilisateur non connecté');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    const urlWithState =` ${url}/debloquerUser/${id}`;

    return this.http.delete<{ message: string }>(urlWithState, { headers });
  }
}
