import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const authForLoginGuard: CanActivateFn = () => {
     const router = inject(Router);
     const authService = inject(AuthService);
      if (authService.isAuthenticatedUser()) {
      router.navigate(['/movies']);
      return false;
    }
    return true;
  };  

