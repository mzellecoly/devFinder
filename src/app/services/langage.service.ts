import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Langage } from '../models/langage.model';
import { url } from './api-url.service';
import Swal from 'sweetalert2';
import { User } from '../models/user.modele';

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
   // Liste
   getAssociation() : Observable<any>{
    return this.http.get<User[]>(`${url}/association/liste`);
  }

  // Ajouter
  addLangage(langage : Langage) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<any>(`${url}/langage/ajouter`, langage,httpOptions);
  }

  // Suppression
  deleteLangage(id: number) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.delete<{ message: string }>(`${url}/langage/` + id, httpOptions);
    // return this.http.delete<{ message: string }>(`${url}/langage/` + id);
  }

  showAlert(title: any, text: any, icon: any) {
    Swal.fire({
      title:title,
      text:text,
      icon:icon,
    });
  }
}
