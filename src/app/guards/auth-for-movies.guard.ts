import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Authentication guard for the movies route.
 * @returns True if user is authenticated, otherwise navigates to login page and returns false.
 */
export const authForMoviesGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.isAuthenticatedUser()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
