import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { url } from './api-url.service';
import { User } from '../models/user.modele';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient, private router: Router) { }

  // Lister les briefs
  getBrief(): Observable<any> {
    return this.http.get<User[]>(`${url}/brief/liste`);
  }
}
