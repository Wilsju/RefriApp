import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Autentificacion} from 'service/Autentication';
import {Router, RouterLink} from '@angular/router';


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

  constructor(private AuthService: Autentificacion, private router: Router) {

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  async Iniciar() {
    const result = await this.AuthService.login(this.form.value.email, this.form.value.password);
    if (result.error) {
      alert(result.error.message);
    }
    else{
      await this.router.navigate(['home']);
    }

  }
}
