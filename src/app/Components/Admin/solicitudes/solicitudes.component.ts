import {Component, inject, OnInit} from '@angular/core';
import {AdminService} from 'service/AdminService';
import {Solicitud} from 'modelos/Solicitud';
import {EstadoSolicitud} from 'constantes/EstadoSolicitud';

@Component({
  selector: 'app-solicitudes',
  imports: [],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesAdminComponent implements OnInit {
  private adminServ = inject(AdminService);
  Solicitudes: Solicitud[] = [];

  async ngOnInit() {
    await this.cargarSolicitudes();
  }

  async cargarSolicitudes() {
    const result = await this.adminServ.ObtenerSolicitudes();
    this.Solicitudes = result.solicitudes;
    if (result.error !== null) {
      alert("Error al cargar las solicitudes");
    }
  }

  async Aceptar(id: number) {
    const result = await this.adminServ.CambiarEstatusSolicitud(id.toString(), EstadoSolicitud.Aceptada);
    if (!result) {
      alert("Error al acepat la  solicitud");
    } else {
      await this.cargarSolicitudes();
    }
  }

  async Rechazar(id: number) {
    const result = await this.adminServ.CambiarEstatusSolicitud(id.toString(), EstadoSolicitud.Rechazada);
    if (!result) {
      alert("Error al rechazar la  solicitud");
    } else {
      await this.cargarSolicitudes();
    }
  }

  protected readonly EstadoSolicitud = EstadoSolicitud;
}
