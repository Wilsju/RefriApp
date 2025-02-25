import {Component, inject} from '@angular/core';

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Autentificacion} from 'service/Autentication';
import {Router, RouterLink} from '@angular/router';
import {NotificationService} from 'service/NotificationService';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form!: FormGroup;
  private notificar = inject(NotificationService);
  private AuthService = inject(Autentificacion);
  private router = inject(Router);

  constructor() {

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      auxtelefono: new FormControl(''),
    })
  }

  async registrar() {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    const datos = this.form.value;
    const resultado = await this.AuthService.registrar(
      datos.email,
      datos.password,
      datos.nombre,
      datos.direccion,
      datos.telefono,
      datos.auxtelefono
    );
    if (resultado.error) {

      this.notificar.NotificarError(resultado.error);
    } else {
      this.notificar.NotificarSucces('registrado');
     await this.router.navigate(['home']);
    }

  }
}
