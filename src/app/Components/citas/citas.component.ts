import {Component, effect, inject, OnInit} from '@angular/core';
import {Autentificacion} from 'service/Autentication';
import {AdminService} from 'service/AdminService';
import {ClienteService} from 'service/ClienteService';
import {Cita} from 'modelos/Cita';
import {NotificationService} from 'service/NotificationService';
import {CitaComponent} from '../Reutilizables/cita/cita.component';
import {EstadoCita} from 'constantes/EstadoCita';
import {AsignarTecnicosComponent} from '../Admin/asignar-tecnicos/asignar-tecnicos.component';

@Component({
  selector: 'app-citas',
  imports: [
    CitaComponent,
    AsignarTecnicosComponent
  ],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {

  private authServ = inject(Autentificacion);
  private adminServ = inject(AdminService);
  private clientServ = inject(ClienteService);
  private notificar = inject(NotificationService);
  citas: Cita[] = [];

  rolActual = this.authServ.rolUsuario;
  citaUsar: Cita | null = null;


  constructor() {
    effect(() => {
      this.cargarCitas();
    });
  }

  async ngOnInit() {
    await this.cargarCitas();

  }

  async cargarCitas() {

    if (this.authServ.rolUsuario() === "admin") {
      const r = await this.adminServ.ObtenerCitas();
      this.citas = r.citas;
      if (r.error) {
        this.notificar.NotificarError("Error al cargar las citas")
      }
    } else if (this.authServ.rolUsuario() === "cliente") {
      const r = await this.clientServ.ObtenerCitasCliente();
      this.citas = r.citas;
      if (r.error) {
        this.notificar.NotificarError("Error al cargar las citas")
      }
    }
  }


  async cambiosEnTecnicos(cambios: boolean) {
    if (cambios) {
      await this.cargarCitas();
      this.citaUsar = null;
    }
  }
  protected readonly EstadoCita = EstadoCita;

  AsignarTecnicos(cita: Cita | null) {
    this.citaUsar = cita;
  }
}
