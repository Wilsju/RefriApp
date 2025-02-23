import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Autentificacion} from 'service/Autentication';
import {Router, RouterLink} from '@angular/router';
import {NotificationService} from 'service/NotificationService';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;
  private notificar = inject(NotificationService);
  private AuthService = inject(Autentificacion);
  private router = inject(Router);

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  async Iniciar() {
    const result = await this.AuthService.login(this.form.value.email, this.form.value.password);
    if (result.error) {
      this.notificar.NotificarError("Error al iniciar seccion");
    } else {
      await this.router.navigate(['home']);
    }

  }
}
