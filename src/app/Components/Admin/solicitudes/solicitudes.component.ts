import {Component, inject, OnInit} from '@angular/core';
import {AdminService} from 'service/AdminService';
import {Solicitud} from 'modelos/Solicitud';
import {EstadoSolicitud} from 'constantes/EstadoSolicitud';
import {NotificationService} from 'service/NotificationService';
import {AsignarTecnicosComponent} from '../asignar-tecnicos/asignar-tecnicos.component';
import {Cita} from 'modelos/Cita';
import {DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-solicitudes',
  imports: [
    AsignarTecnicosComponent,
    DatePipe,
    NgClass
  ],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesAdminComponent implements OnInit {
  private adminServ = inject(AdminService);
  private notificar = inject(NotificationService);
  Solicitudes: Solicitud[] = [];
  CitaActual: Cita | null = null;

  async ngOnInit() {
    await this.cargarSolicitudes();
  }

  async AsignarTecnicos(solicitudId: number) {
    const result = await this.adminServ.ObtenerCitaPorSolicitudId(5);
    if (result.error === null) {
      this.CitaActual = result.cita;
    } else {
      this.notificar.NotificarError("Error al ir cambiar los tecnicos");
    }
  }


  async cargarSolicitudes() {
    const result = await this.adminServ.ObtenerSolicitudes();
    this.Solicitudes = result.solicitudes;
    if (result.error !== null) {
      this.notificar.NotificarError("Error al cargar las solicitudes");
    }
  }

  async Aceptar(id: number) {
    const result = await this.adminServ.CambiarEstatusSolicitud(id.toString(), EstadoSolicitud.Aceptada);
    if (!result) {
      this.notificar.NotificarError("Error al aceptar la  solicitud");
    } else {
      await this.cargarSolicitudes();
      this.notificar.NotificarSucces("Solicitud Aceptada");
    }
  }

  async Rechazar(id: number) {
    const result = await this.adminServ.CambiarEstatusSolicitud(id.toString(), EstadoSolicitud.Rechazada);
    if (!result) {
      this.notificar.NotificarError("Error al rechazar la  solicitud");
    } else {
      await this.cargarSolicitudes();
      this.notificar.NotificarError("Solicitud Rechazada");
    }
  }

  protected readonly EstadoSolicitud = EstadoSolicitud;

  async CerrarAsignarTecnicos() {
    this.CitaActual = null;
    await this.cargarSolicitudes();
  }

  cambiosEnTecnicos(cambios: boolean) {
    if (cambios) {
      this.cargarSolicitudes();
      this.CitaActual = null;
    }
  }
}
