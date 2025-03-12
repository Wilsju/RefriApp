import {Component, inject, OnInit} from '@angular/core';
import {Autentificacion} from 'service/Autentication';
import {Cliente} from 'modelos/Cliente';
import {NotificationService} from 'service/NotificationService';
import {ClienteService} from 'service/ClienteService';
import {Cita} from 'modelos/Cita';
import {NgClass} from '@angular/common';
import {EstadoCita} from 'constantes/EstadoCita';

@Component({
  selector: 'app-perfil',
  imports: [
    NgClass
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  private auth = inject(Autentificacion);
  private clientServ = inject(ClienteService);
  private notificar = inject(NotificationService);
  cliente : Cliente = {
    id: 0,
    Nombre: '',
    Direccion: '',
    Telefono: '',
    AuxTelefono: null,
    AuthId: '',
    email: ''
  };
   citas: Cita[] = [];

  async ngOnInit() {
    const resultClient = await this.auth.obtenerUsuario();
    if(resultClient.error) {
      this.notificar.NotificarError("Upps, algo salio mal al cargar tu perfil!!")
    }
    else{
      this.cliente = resultClient.cliente;
    }

    const resultCitas = await  this.clientServ.ObtenerCitasCliente();
    if(resultCitas.error) {
      this.notificar.NotificarError("Upps, algo salio mal al cargar tus citas!!")
    }
    else{
      this.citas = resultCitas.citas;
    }


  }

  protected readonly EstadoCita = EstadoCita;
}
