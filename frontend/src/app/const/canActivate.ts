import { CanActivateFn, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthGuardService } from '../services/auth-guard.service';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const authService = inject(AuthGuardService);
  const router = inject(Router);

  return authService.checkLogin().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {

        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const authService = inject(AuthGuardService);
  const router = inject(Router);

  return authService.checkLogin().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {

        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
