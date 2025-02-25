import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Autentificacion} from 'service/Autentication';
import {NotificationService} from 'service/NotificationService';

export function rutaSeguraGuard(usuariosPermitidos: string[]): CanActivateFn {
  return (route, state): boolean => {
    const authServ = inject(Autentificacion);
    const notificar = inject(NotificationService);
    const router = inject(Router);

    const puedeSeguir = authServ.rolUsuario() != null && usuariosPermitidos.includes(authServ.rolUsuario() ?? "");
    if (!puedeSeguir) {
      notificar.NotificarFaltaLoguearse("Debes iniciar seccion seccion!");
      authServ.rolUsuario();
      router.navigate(['/login']);
    }
    return puedeSeguir;
  }
}
