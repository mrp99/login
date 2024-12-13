import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  public checkLogin(): Observable<boolean> {
    const authToken = sessionStorage.getItem('auth-token');
    if (authToken) return of(true);
    else return of(false);
  }

  public redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
