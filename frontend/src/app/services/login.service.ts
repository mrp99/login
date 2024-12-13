import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api_login: string = "http://localhost:8080/auth/login";
  private api_register: string = "http://localhost:8080/auth/register";

  constructor(private http: HttpClient) { }

  public login(email: string, password: string) {

    return this.http.post<LoginResponse>(this.api_login, { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.name);
      })
    );
  }

  public signup(name: string, email: string, password: string) {

    return this.http.post<LoginResponse>(this.api_register, { name, email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.name);
      })
    );
  }
}
