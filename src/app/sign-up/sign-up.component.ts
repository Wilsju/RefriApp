import { Component } from '@angular/core';
import {Autentificacion} from '../Services/service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form!: FormGroup;
  constructor(private AuthService:Autentificacion) {

    this.form = new FormGroup({
      email:new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('', [Validators.required])
    })
  }

  Registrar() {
this.AuthService.registrar(this.form.value.email, this.form.value.password);
  }
}
