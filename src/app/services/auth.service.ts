import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.modele';
import { url } from './apiUrl';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdmin$ = new BehaviorSubject<boolean>(false);
  // urlAuth = 'http://localhost:8000';

  isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  private userProfileSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public userProfile$: Observable<User | null> =
    this.userProfileSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, mot_de_passe: string): Observable<any> {
    const credentials = { email: email, mot_de_passe: mot_de_passe };

    return this.http.post<any>(`${url}/connexion`, credentials).pipe(
      tap((response) => {
        // console.log('reponse backend auth :');
        // console.log(response);
        if (response) {
          // console.log('userConnecté :');
          // console.log('user', response);
          // localStorage.setItem('token', response.token);

          localStorage.setItem("token", JSON.stringify(response.token).replace(/['"]+/g, ''));
          localStorage.setItem('userId', response.id);
          localStorage.setItem('user', JSON.stringify(response));


          console.log('user', response);
          this.isAuthenticatedSubject.next(true);
          this.isAdmin$.next(
            response.email === 'admin@admin.com' &&
              response.mot_de_passe === 'password'
          );
          this.router.navigate(['/superadmin']);
        }
      })
    );
  }

  logout() {
    // Logique de déconnexion
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');

    this.router.navigate(['/auth']);
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${url}/utilisateur/connecter`).pipe(
      tap((userProfile) => {
        this.userProfileSubject.next(userProfile);
      })
    );
  }

  // / Service qui verifie quel utilisateur est connecter
  IsOnline(): { user: User | null; role: string | null } {
    const userOnlineString = localStorage.getItem('user');
    if (userOnlineString) {
      const userOnline = JSON.parse(userOnlineString);
      const role =
        userOnline && userOnline.role ? userOnline.role.toString() : null;
        // console.log('celui qui est connecté et son role:',userOnline,userOnline.role);
      return { user: userOnline, role: role };
    }
    return { user: null, role: null };
  }
  isUserLog(): boolean {
    const { user } = this.IsOnline();
    return user !== null ;
  }
  isUserLogApprenant(): boolean {
    const { user, role } = this.IsOnline();
    return user !== null && role === 'ROLE_APPRENANT';
  }
  isUserLoggedIn(): boolean {
    const { user } = this.IsOnline();
    // console.log('user est' us);
    return user !== null;
  }
  isUserLoggedInn(): boolean {
    const { user, role } = this.IsOnline();
    return user !== null && role === 'ROLE_APPRENANT';
  }
  isUserLogged(): boolean {
    const { user, role } = this.IsOnline();
    return user !== null && role === 'ROLE_APPRENANT';
  }

  inscriptionApprenant(user: any): Observable<any> {
    return this.http.post<any>(`${url}/apprenant/inscription`, user);
  }
  inscriptionAssociation(user: any): Observable<any> {
    return this.http.post<any>(`${url}/association/inscription`, user);
  }
  inscriptionEntreprise(user: any): Observable<any> {
    return this.http.post<any>(`${url}/entreprise/inscription`, user);
  }
}
