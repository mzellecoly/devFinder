import { CanActivateFn, Router } from '@angular/router';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const accessToken = localStorage.getItem('access_token');
  // Vérifier si le token d'authentification est présent dans le local storage
  if (!accessToken) {
    // Si le token n'existe pas, rediriger l'utilisateur vers la page de connexion
    router.navigate(['auth']);
    return false;
  }
  const userConnect = JSON.parse(localStorage.getItem('userOnline') || '');
  if (userConnect) {
    if (userConnect.role == 'ROLE_ADMIN') {
      return true;
    } else {
      router.navigate(['auth']);
      return false;
    }
  } else {
    return false;
  }
};
