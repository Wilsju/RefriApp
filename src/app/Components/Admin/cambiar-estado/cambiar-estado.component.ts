import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Cita} from 'modelos/Cita';
import {AdminService} from 'service/AdminService';
import {CitaComponent} from '../../Reutilizables/cita/cita.component';
import {EstadoSolicitud} from 'constantes/EstadoSolicitud';
import {FormsModule} from '@angular/forms';
import {NotificationService} from 'service/NotificationService';
import {EstadoCita} from 'constantes/EstadoCita';

@Component({
  selector: 'app-cambiar-estado',
  imports: [
    CitaComponent,
    FormsModule
  ],
  templateUrl: './cambiar-estado.component.html',
  styleUrl: './cambiar-estado.component.css'
})
export class CambiarEstadoComponent implements OnInit {

  @Input({required: true}) cita !: Cita;
  @Output() cambios = new EventEmitter<boolean>();
  private adminServ = inject(AdminService);
  private notificar = inject(NotificationService);
   original = "";
  nuevoValor = "";

  protected readonly EstadoSolicitud = EstadoSolicitud;

  constructor() {
  }

  ngOnInit() {

    this.original = this.cita.Estado.toString();
    this.nuevoValor = this.cita.Estado;
  }

  async cambiar() {
    if (this.original !== this.nuevoValor) {
      const update = await this.adminServ.ActualizarEstado(this.cita.id, this.nuevoValor);
      if (update) {
        this.notificar.NotificarSucces("Estado cambiado");
        this.cambios.emit(true);

      } else {
        this.cambios.emit(false);
      }
    } else {
      this.cambios.emit(false);
    }
  }

  cancelar() {
    this.cambios.emit(false);
  }

  protected readonly EstadoCita = EstadoCita;
}
