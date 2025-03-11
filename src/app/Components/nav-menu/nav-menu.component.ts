import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgClass, NgIf} from '@angular/common';
import {Autentificacion} from 'service/Autentication';
import {NotificacionComponent} from '../notificacion/notificacion.component';

@Component({
  selector: 'app-nav-menu',
  imports: [
    RouterLinkActive,
    RouterLink,
    NotificacionComponent,
    NgIf,
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  private router = inject(Router);
  private authServ = inject(Autentificacion);
  rolActual = this.authServ.rolUsuario;
  mostrarMenu = false;
 isProfileMenuOpen=false;

  async CerrarSecion() {
    await this.authServ.logout();
    await this.router.navigateByUrl('/home');
  }

  btnClickMenu() {
    this.mostrarMenu = !this.mostrarMenu;
    const menu = document.getElementById('menu');
    if (menu) {
      menu.style.transform = this.mostrarMenu ? 'translateX(0)' : 'translateX(-100%)';
    }
  }

  cerrarMenu() {
    if (this.mostrarMenu) {
      this.mostrarMenu = false;
      const menu = document.getElementById('menu');
      if (menu) {
        menu.style.transform = this.mostrarMenu ? 'translateX(0)' : 'translateX(-100%)';
      }
    }
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  cerrarProfileMenu() {
    this.isProfileMenuOpen = false;
  }

}


