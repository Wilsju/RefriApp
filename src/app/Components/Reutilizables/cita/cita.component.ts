import {Component, Input} from '@angular/core';
import {Cita} from 'modelos/Cita';
import {NgClass, TitleCasePipe} from '@angular/common';
import {EstadoSolicitud} from 'constantes/EstadoSolicitud';
import {EstadoCita} from 'constantes/EstadoCita';

@Component({
  selector: 'cita-component',
  imports: [
    TitleCasePipe,
    NgClass
  ],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css'
})
export class CitaComponent {

  @Input({required: true}) cita!: Cita;

  protected readonly EstadoCita = EstadoCita;
}
