import { Component, OnInit } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from 'src/app/components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl<string | null>('', [Validators.required, Validators.email]),
      password: new FormControl<string | null>('', [Validators.required, Validators.minLength(6)])
    });
  }

  public submit(): void {
    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';
    if (email && password) {
      this.loginService.login(email, password).subscribe({
        next: () => console.log("sucesso"),
        error: () => console.log("erro"),
      });
    } else {
      console.log("Por favor, preencha os campos.");
    }
  }

  public navigate(): void {
    this.router.navigate(["signup"]);
  }


}
