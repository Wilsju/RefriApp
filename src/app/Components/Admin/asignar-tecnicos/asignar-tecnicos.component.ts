import {Component, EventEmitter, inject, Input, input, OnInit, Output} from '@angular/core';
import {AdminService} from 'service/AdminService';
import {NotificationService} from 'service/NotificationService';
import {Solicitud} from 'modelos/Solicitud';
import {Tecnico} from 'modelos/Tecnico';
import {EstadoSolicitud} from 'constantes/EstadoSolicitud';
import {Cita} from 'modelos/Cita';
import {CitaComponent} from '../../Reutilizables/cita/cita.component';

@Component({
  selector: 'app-asignar-tecnicos',
  imports: [
    CitaComponent
  ],
  templateUrl: './asignar-tecnicos.component.html',
  styleUrl: './asignar-tecnicos.component.css'
})
export class AsignarTecnicosComponent implements OnInit {

  @Input({required: true}) cita !: Cita;
  @Output() cambios = new EventEmitter<boolean>();
  private adminServ = inject(AdminService);
  private notificar = inject(NotificationService);
  tecnicos: Tecnico[] = [];
  cambiosRealizados: boolean = false;

  async ngOnInit() {
    const result = await this.adminServ.ObtenerTecnicos();
    this.tecnicos = result.tecnicos;
    if (result.error) {
      this.notificar.NotificarError("error al cargar los tecnicos");
    }
  }

  asignarTecnico(tecnico: string) {
    if (!this.cita.TecnicosAsig.includes(tecnico)) {
      this.cita.TecnicosAsig.push(tecnico);
      this.cambiosRealizados = true;
      if (this.cita.TecnicosAsig.includes("Ninguno")) {
        this.cita.TecnicosAsig = this.cita.TecnicosAsig.filter(x => x !== "Ninguno");
      }
    }
  }

  removerTecnico(tecnico: string) {
    this.cita.TecnicosAsig = this.cita.TecnicosAsig.filter(t => t !== tecnico);
    this.cambiosRealizados = true;
    if (this.cita.TecnicosAsig.length === 0) {
      this.cita.TecnicosAsig.push("Ninguno");
    }
  }

  protected readonly EstadoSolicitud = EstadoSolicitud;


  async guardarCambios() {
    const result = await this.adminServ.AsignarTecnicos(this.cita.id, this.cita.TecnicosAsig);
    if (result) {
      this.notificar.NotificarSucces("Tecnicos asignados!");
      this.cambios.emit(true);
    } else {
      this.notificar.NotificarError("Error al asignar los tecnicos !");
    }
  }
}
