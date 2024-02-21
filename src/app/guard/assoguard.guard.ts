import { CanActivateFn, Router } from '@angular/router';

export const assoguardGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const userConnect = JSON.parse(localStorage.getItem('userOnline') || '');
  if (userConnect) {
    if (userConnect.role == 'ROLE_ASSOCIATION') {
      return true;
    } else {
      router.navigate(['auth']);
      return false;
    }
  } else {
    return false;
  }
};
