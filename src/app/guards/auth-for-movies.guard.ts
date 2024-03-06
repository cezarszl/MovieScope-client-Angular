import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authForMoviesGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.isAuthenticatedUser()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
