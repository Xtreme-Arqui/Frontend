import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router)

  const user = authService.getUser();
  if (user) {
    const userType = user.userType; // Aventurero o agencia
    const expectedUserType = route.data['expectedUserType']; // Añadido en las rutas
    if (!expectedUserType || expectedUserType === userType) {
      return true;
    }
    router.navigate(['/access-denied']);
    return false;
  } else {
    router.navigate(['/access-denied']);
    return false;
  }
};
