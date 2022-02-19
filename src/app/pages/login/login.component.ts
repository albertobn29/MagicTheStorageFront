import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackServiceService } from 'src/app/services/back-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: String = '';

  constructor(
    private fb: FormBuilder,
    private loginS: BackServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  /**
   * Función que comprueba el login y crea los objetos de Sesión
   */
  login() {
    let form = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };
    this.loginS.login(form).subscribe((data) => {
      if (data.token) {
        sessionStorage.setItem('x-auth-token', data.token);
        sessionStorage.setItem('user_id', data.users.id);
        sessionStorage.setItem('user_username', data.users.username);
        this.router.navigate(['/inicio']).then(() => {
          window.location.reload();
        });
      } else {
        this.error = data.msg;
        this.router.navigate(['/login']);
      }
    });
  }
}
