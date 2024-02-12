import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { url } from './api-url.service';
import { Brief } from '../models/brief.model';
import { Observable, of } from 'rxjs';
import { Imerssion } from '../models/immersion.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RessourcesService {
  constructor(private http: HttpClient, private router: Router) {}

  // Lister les briefs
  getBrief(): Observable<any> {
    return this.http.get<Brief[]>(`${url}/brief/liste`);
  }
  // Lister les immerssion
  getImerssion(): Observable<any> {
    return this.http.get<Imerssion[]>(`${url}/immersion/liste`);
  }

  ajoutImmersion(imerssion: Imerssion) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<any>(`${url}/immersion/publier`, imerssion,httpOptions);
  }

  // Ajouter brief
  ajoutBrief(brief: Brief) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<any>(`${url}/brief/publier`, brief,httpOptions);
  }
  showAlert(title: any, text: any, icon: any) {
    Swal.fire({
      title:title,
      text:text,
      icon:icon,
    });
  }
    // Suppression immersion
    deleteImmersion(id: number) {
      const token = localStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };
      return this.http.delete<{ message: string }>(`${url}/immersion/` + id, httpOptions);
    }

    // Suppression brief
    deleteBrief(id: number) {
      const token = localStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };
      return this.http.delete<{ message: string }>(`${url}/brief/` + id, httpOptions);
    }

    // Modifier immersion
    updateImmersion(id: number, immersion:any): Observable<any> {
      const token = localStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };
      return this.http.put<any>(`${url}/immersion/` +id, immersion, httpOptions);
    }
     // Modifier brief
    updateBrief(id: number, brief:any): Observable<any> {
      const token = localStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };
      return this.http.put<any>(`${url}/brief/` +id, brief, httpOptions);
    }
    
}
