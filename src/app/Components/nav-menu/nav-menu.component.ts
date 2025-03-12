import {Component, effect, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgClass} from '@angular/common';
import {Autentificacion} from 'service/Autentication';
import {NotificacionComponent} from '../notificacion/notificacion.component';
import {Cliente} from 'modelos/Cliente';

@Component({
  selector: 'app-nav-menu',
  imports: [
    RouterLinkActive,
    RouterLink,
    NotificacionComponent,

    NgClass,
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent implements OnInit {
  private router = inject(Router);
  private authServ = inject(Autentificacion);
  rolActual = this.authServ.rolUsuario;
  mostrarMenu = false;
  isProfileMenuOpen = false;
  clienteActual: Cliente | null = null;
  constructor() {
    effect(async () => {
      if (this.rolActual() === 'cliente') {
        const resultCliente = await this.authServ.obtenerUsuario();
        this.clienteActual = resultCliente.cliente;
      }
    });
  }

  async ngOnInit() {


  }

  async CerrarSecion() {
    this.cerrarProfileMenu();
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


