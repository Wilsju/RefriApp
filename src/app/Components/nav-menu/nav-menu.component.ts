import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgClass} from '@angular/common';
import {Autentificacion} from 'service/Autentication';
import {NotificacionComponent} from '../notificacion/notificacion.component';

@Component({
  selector: 'app-nav-menu',
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    NgClass,
    NotificacionComponent
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  private router = inject(Router);
  private authServ = inject(Autentificacion);
  rolActual = this.authServ.rolUsuario;


  async CerrarSecion() {
    await this.authServ.logout();
    await this.router.navigateByUrl('/home');
  }
}
