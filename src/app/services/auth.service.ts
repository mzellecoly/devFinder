import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.modele';
import { url } from './api-url.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdmin$ = new BehaviorSubject<boolean>(false);
  urlAuth="http://localhost:8000";

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, mot_de_passe: string): Observable<any> {
    const credentials = { email: email, mot_de_passe: mot_de_passe };

    return this.http.post<any>(`${this.urlAuth}/connexion`, credentials).pipe(
      tap((response) => {
        // console.log("reponse backend auth :");
        // console.log(response);
        if (response) {
          // console.log("userConnecté :");
          console.log("user",response);
          localStorage.setItem("token",response.token);
          this.isAuthenticatedSubject.next(true);
          this.isAdmin$.next(response.email === 'admin@admin.com' && response.mot_de_passe ==='password'); // Mettez à jour en fonction de votre logique de rôle
          // Gérer la redirection ici si nécessaire
          this.router.navigate(['/superadmin']);
        }
      })
    );
  }

  logout() {
    // Logique de déconnexion
    this.isAuthenticatedSubject.next(false);
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
