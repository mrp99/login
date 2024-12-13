import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from 'src/app/components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignUpForm {
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {

  public signupForm!: FormGroup<SignUpForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)],),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public submit(): void {
    const name = this.signupForm.value.name ?? '';
    const email = this.signupForm.value.email ?? '';
    const password = this.signupForm.value.password ?? '';
    const passwordConfirm = this.signupForm.value.passwordConfirm ?? '';

    if (name && email && password && passwordConfirm) {
      this.loginService.signup(name, email, password).subscribe({
        next: () => this.toastrService.success('Login feito com sucesso'),
        error: () => this.toastrService.error('Erro ao fazer login'),
      });
    } else {
      this.toastrService.info("Por favor, preencha os campos.");
    }
  }

  public navigate(): void {
    this.router.navigate(["login"]);
  }


}
