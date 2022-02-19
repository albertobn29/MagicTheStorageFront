import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackServiceService } from 'src/app/services/back-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: String = '';

  constructor(
    private fb: FormBuilder,
    private login: BackServiceService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
        apellido: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repetirPassword: [''],
      },
      { validator: this.checkPassword }
    );
  }

  ngOnInit(): void {}

  /**
   * Función que recoge los datos del formulario de registro,
   *  lo registra, y crea los objetos de Sesión
   */
  register() {
    let form = {
      username: this.registerForm.controls.username.value,
      nombre: this.registerForm.controls.nombre.value,
      apellido: this.registerForm.controls.apellido.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
    };
    this.login.register(form).subscribe((data) => {
      if (data.token) {
        sessionStorage.setItem('x-auth-token', data.token);
        sessionStorage.setItem('user_id', data.users.id);
        sessionStorage.setItem('user_username', data.users.username);
        this.router.navigate(['/inicio'], {
          queryParams: { registro: 'success' },
        });
      } else {
        this.error = data.msg;
        this.router.navigate(['/registro']);
      }
    });
  }

  /**
   * Función que comprueba que las dos contraseñas son iguales
   * @param group
   * @returns
   */
  checkPassword(group: FormGroup): any {
    const pass = group.controls.password?.value;
    const confirmPassword = group.controls.repetirPassword?.value;
    return pass === confirmPassword ? null : { notSame: true };
  }
}
